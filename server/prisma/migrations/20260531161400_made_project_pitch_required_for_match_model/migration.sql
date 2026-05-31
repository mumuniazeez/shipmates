/*
  Warnings:

  - Made the column `projectPitchId` on table `matches` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "matches" ALTER COLUMN "projectPitchId" SET NOT NULL;
