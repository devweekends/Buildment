import type { LearnerHabit, LearnerWorkspace } from "@/shared/api/learner";
import type { GamificationSummary } from "@/shared/api/gamification";
import { requireLearnSurface } from "@/server/auth/guards";
import { serverApiFetch } from "@/lib/api-server";
import { MenteeWorkspaceShell } from "@/components/learn/mentee-workspace-shell";
import { signOutAction } from "@/server/auth/actions";

export default async function LearnMainLayout({ children }: { children: React.ReactNode }) {
  const user = await requireLearnSurface();
  const [workspace, gamification, habit] = await Promise.all([
    serverApiFetch<LearnerWorkspace>("/api/v1/learner/workspace"),
    serverApiFetch<GamificationSummary>("/api/v1/learner/gamification").catch(() => null),
    serverApiFetch<LearnerHabit>("/api/v1/learner/habit").catch(() => null),
  ]);

  const stats = {
    streak: habit?.streakCount ?? 0,
    level: gamification?.level?.level ?? null,
    career: gamification?.career?.title ?? null,
    credits: gamification?.credits?.balance ?? null,
    hidden: gamification?.hidden ?? false,
  };

  return (
    <MenteeWorkspaceShell
      user={user}
      instructorAccess={workspace.instructorAccess}
      assignedCourses={workspace.assignedCourses}
      pendingReviews={workspace.pendingReviews}
      openHelpRequests={workspace.openHelpRequests}
      signOutAction={signOutAction}
      stats={stats}
    >
      {children}
    </MenteeWorkspaceShell>
  );
}
