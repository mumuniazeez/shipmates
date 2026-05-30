/*
  Warnings:

  - You are about to alter the column `description` on the `project_pitches` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(5000)`.

*/
-- AlterTable
ALTER TABLE "project_pitches" ALTER COLUMN "description" SET DATA TYPE CHAR(5000);
