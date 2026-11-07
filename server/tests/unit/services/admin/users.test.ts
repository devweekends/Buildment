import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  user: { findUnique: vi.fn(), update: vi.fn() },
  course: { findUnique: vi.fn() },
  enrollment: { findUnique: vi.fn(), delete: vi.fn(), update: vi.fn(), create: vi.fn() },
  response: { deleteMany: vi.fn() },
  instructorAccessRequest: { findUnique: vi.fn(), update: vi.fn(), upsert: vi.fn() },
  adminAuditLog: { create: vi.fn() },
  $transaction: vi.fn(),
  $executeRaw: vi.fn(),
}));
vi.mock("../../../../src/db/prisma.js", () => ({ prisma: db }));
vi.mock("../../../../src/services/notifications/events.js", () => ({
  notifyUserGrantedAdminByAdmin: vi.fn(),
  notifyUserGrantedInstructorByAdmin: vi.fn(),
  notifyUserInstructorAccessDecision: vi.fn(),
}));

import {
  approveInstructorRequest,
  enrollUser,
  removeUserEnrollment,
  setInstructorAccess,
} from "../../../../src/services/admin/users.js";
import { canAccessTeachSurface } from "../../../../src/services/auth/access-rules.js";

const admin = { id: "admin", email: "admin@test.local" };

beforeEach(() => {
  vi.resetAllMocks();
  db.$transaction.mockImplementation(async (work) =>
    typeof work === "function" ? work(db) : Promise.all(work));
});

describe("mentor role changes", () => {
  it("promotes a mentee when an admin approves a pending request", async () => {
    db.instructorAccessRequest.findUnique.mockResolvedValue({
      id: "request", userId: "learner", status: "PENDING", user: { role: "MENTEE", email: "learner@test.local" },
    });
    await approveInstructorRequest(admin, "request");
    expect(db.user.update).toHaveBeenCalledWith({
      where: { id: "learner" }, data: { role: "MENTOR" },
    });
    expect(db.instructorAccessRequest.update).toHaveBeenCalledWith({
      where: { id: "request" },
      data: { status: "APPROVED", reviewedById: "admin", reviewedAt: expect.any(Date) },
    });
    expect(db.adminAuditLog.create).toHaveBeenCalledOnce();
  });

  it("revokes teaching access by returning a mentor to the mentee role", async () => {
    db.user.findUnique.mockResolvedValue({ role: "MENTOR", email: "mentor@test.local" });
    await setInstructorAccess(admin, "mentor", false);
    const update = db.user.update.mock.calls[0][0];
    expect(update.data).toEqual({ role: "MENTEE" });
    expect(canAccessTeachSurface(update.data)).toBe(false);
  });

  it("preserves an admin's role and access", async () => {
    db.user.findUnique.mockResolvedValue({ role: "ADMIN", email: "admin@test.local" });
    await setInstructorAccess(admin, "admin", false);
    expect(db.user.update).toHaveBeenCalledWith({
      where: { id: "admin" }, data: { role: "ADMIN" },
    });
  });

  it("does not promote a user from a rejected request", async () => {
    db.instructorAccessRequest.findUnique.mockResolvedValue({
      id: "request", userId: "learner", status: "REJECTED", user: { role: "MENTEE", email: "learner@test.local" },
    });
    await expect(approveInstructorRequest(admin, "request")).rejects.toThrow();
    expect(db.user.update).not.toHaveBeenCalled();
  });
});

describe("removeUserEnrollment", () => {
  it("removes an enrollment, cleans up responses, and writes an audit log", async () => {
    db.enrollment.findUnique.mockResolvedValue({
      id: "enr-1",
      userId: "user-1",
      courseId: "course-1",
      organizationId: null,
      course: { title: "Building Fullstack Apps" },
      user: { id: "user-1", email: "learner@test.local" },
    });

    await removeUserEnrollment(admin, "enr-1", "user-1");

    expect(db.response.deleteMany).toHaveBeenCalledWith({ where: { enrollmentId: "enr-1" } });
    expect(db.enrollment.delete).toHaveBeenCalledWith({ where: { id: "enr-1" } });
    expect(db.adminAuditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: "user.remove-enrollment",
          targetType: "Enrollment",
          targetId: "enr-1",
        }),
      })
    );
  });

  it("releases organization enrollment slot when enrolled through an organization", async () => {
    db.enrollment.findUnique.mockResolvedValue({
      id: "enr-2",
      userId: "user-2",
      courseId: "course-1",
      organizationId: "org-1",
      course: { title: "Building Fullstack Apps" },
      user: { id: "user-2", email: "employee@org.local" },
    });

    await removeUserEnrollment(admin, "enr-2");

    expect(db.$executeRaw).toHaveBeenCalled();
    expect(db.enrollment.delete).toHaveBeenCalledWith({ where: { id: "enr-2" } });
  });

  it("throws NotFoundError if enrollment does not exist", async () => {
    db.enrollment.findUnique.mockResolvedValue(null);
    await expect(removeUserEnrollment(admin, "missing-enr")).rejects.toThrow("Enrollment not found");
  });

  it("throws ConflictError if userId does not match the enrollment", async () => {
    db.enrollment.findUnique.mockResolvedValue({
      id: "enr-1",
      userId: "user-1",
      courseId: "course-1",
      organizationId: null,
      course: { title: "Course" },
      user: { id: "user-1", email: "a@b.com" },
    });
    await expect(removeUserEnrollment(admin, "enr-1", "other-user")).rejects.toThrow(
      "Enrollment does not belong to the specified user."
    );
  });
});

describe("enrollUser", () => {
  it("creates an active enrollment and writes audit log", async () => {
    db.user.findUnique.mockResolvedValue({ id: "user-1", email: "learner@test.local" });
    db.course.findUnique.mockResolvedValue({ id: "course-1", title: "Course 1" });
    db.enrollment.findUnique.mockResolvedValue(null);
    db.enrollment.create.mockResolvedValue({ id: "new-enr" });

    const result = await enrollUser(admin, "user-1", "course-1");

    expect(result).toEqual({ id: "new-enr" });
    expect(db.enrollment.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: "user-1",
        courseId: "course-1",
        lifecycle: "ACTIVE",
        status: "IN_PROGRESS",
      }),
    });
    expect(db.adminAuditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: "user.enroll",
          targetType: "Enrollment",
          targetId: "new-enr",
        }),
      })
    );
  });

  it("reactivates an existing non-active enrollment", async () => {
    db.user.findUnique.mockResolvedValue({ id: "user-1", email: "learner@test.local" });
    db.course.findUnique.mockResolvedValue({ id: "course-1", title: "Course 1" });
    db.enrollment.findUnique.mockResolvedValue({ id: "existing-enr", lifecycle: "PAYMENT_REQUIRED", startedAt: null });
    db.enrollment.update.mockResolvedValue({ id: "existing-enr" });

    const result = await enrollUser(admin, "user-1", "course-1");

    expect(result).toEqual({ id: "existing-enr" });
    expect(db.enrollment.update).toHaveBeenCalledWith({
      where: { id: "existing-enr" },
      data: expect.objectContaining({ lifecycle: "ACTIVE", status: "IN_PROGRESS" }),
    });
  });

  it("rejects if user is already actively enrolled", async () => {
    db.user.findUnique.mockResolvedValue({ id: "user-1", email: "learner@test.local" });
    db.course.findUnique.mockResolvedValue({ id: "course-1", title: "Course 1" });
    db.enrollment.findUnique.mockResolvedValue({ id: "existing-enr", lifecycle: "ACTIVE" });

    await expect(enrollUser(admin, "user-1", "course-1")).rejects.toThrow("already enrolled");
  });
});
