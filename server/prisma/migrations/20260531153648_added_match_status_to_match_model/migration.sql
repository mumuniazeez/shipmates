/*
  Warnings:

  - Added the required column `matchStatus` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('matching', 'matched', 'rejected');

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "matchStatus" "MatchStatus" NOT NULL;
