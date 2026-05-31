/*
  Warnings:

  - A unique constraint covering the columns `[slackChannelName]` on the table `matches` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slackChannelName` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "slackChannelName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "matches_slackChannelName_key" ON "matches"("slackChannelName");
