/*
  Warnings:

  - You are about to drop the column `yswsName` on the `project_pitches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project_pitches" DROP COLUMN "yswsName",
ADD COLUMN     "yswsProgramName" TEXT;
