/*
  Warnings:

  - The values [matched] on the enum `MatchStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[slackChannelId]` on the table `matches` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MatchStatus_new" AS ENUM ('pending', 'matching', 'accepted', 'rejected');
ALTER TABLE "public"."matches" ALTER COLUMN "matchStatus" DROP DEFAULT;
ALTER TABLE "matches" ALTER COLUMN "matchStatus" TYPE "MatchStatus_new" USING ("matchStatus"::text::"MatchStatus_new");
ALTER TYPE "MatchStatus" RENAME TO "MatchStatus_old";
ALTER TYPE "MatchStatus_new" RENAME TO "MatchStatus";
DROP TYPE "public"."MatchStatus_old";
ALTER TABLE "matches" ALTER COLUMN "matchStatus" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slackChannelId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "matchStatus" SET DEFAULT 'pending',
ALTER COLUMN "slackChannelName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "matches_slackChannelId_key" ON "matches"("slackChannelId");
