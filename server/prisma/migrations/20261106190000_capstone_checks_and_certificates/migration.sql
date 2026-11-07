-- Capstone checker and certificates (docs/16-capstone-checker-and-certificates.mdx).
-- CreateEnum
CREATE TYPE "CapstoneCheckStatus" AS ENUM ('QUEUED', 'RUNNING', 'DONE', 'FAILED');

-- AlterEnum
ALTER TYPE "BlockType" ADD VALUE 'CAPSTONE_CHECK';

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "certificate" JSONB;

-- CreateTable
CREATE TABLE "CapstoneCheck" (
    "id" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "responseId" TEXT,
    "attempt" INTEGER NOT NULL,
    "status" "CapstoneCheckStatus" NOT NULL DEFAULT 'QUEUED',
    "repoUrl" TEXT NOT NULL,
    "liveUrl" TEXT,
    "commitSha" VARCHAR(64),
    "packId" VARCHAR(80) NOT NULL,
    "packVersion" INTEGER NOT NULL,
    "automated" JSONB,
    "report" JSONB,
    "percent" INTEGER,
    "completed" BOOLEAN,
    "reusedFromId" TEXT,
    "aiCalled" BOOLEAN NOT NULL DEFAULT false,
    "model" VARCHAR(120),
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "costMicroUsd" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "CapstoneCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuerName" TEXT NOT NULL,
    "issuerTitle" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "evidence" JSONB,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "revokedReason" TEXT,
    "revokedById" TEXT,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CapstoneCheck_responseId_key" ON "CapstoneCheck"("responseId");

-- CreateIndex
CREATE INDEX "CapstoneCheck_blockId_userId_createdAt_idx" ON "CapstoneCheck"("blockId", "userId", "createdAt");

-- CreateIndex
CREATE INDEX "CapstoneCheck_status_createdAt_idx" ON "CapstoneCheck"("status", "createdAt");

-- CreateIndex
CREATE INDEX "CapstoneCheck_aiCalled_createdAt_idx" ON "CapstoneCheck"("aiCalled", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_code_key" ON "Certificate"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_enrollmentId_key" ON "Certificate"("enrollmentId");

-- CreateIndex
CREATE INDEX "Certificate_userId_idx" ON "Certificate"("userId");

-- CreateIndex
CREATE INDEX "Certificate_courseId_idx" ON "Certificate"("courseId");

-- AddForeignKey
ALTER TABLE "CapstoneCheck" ADD CONSTRAINT "CapstoneCheck_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapstoneCheck" ADD CONSTRAINT "CapstoneCheck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapstoneCheck" ADD CONSTRAINT "CapstoneCheck_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
