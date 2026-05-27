/*
  Warnings:

  - Made the column `userId` on table `project_pitches` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project_pitches" ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "projectOwnerId" TEXT NOT NULL,
    "matchingUserId" TEXT NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectPitchToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectPitchToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE INDEX "_ProjectPitchToSkill_B_index" ON "_ProjectPitchToSkill"("B");

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_projectOwnerId_fkey" FOREIGN KEY ("projectOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_matchingUserId_fkey" FOREIGN KEY ("matchingUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectPitchToSkill" ADD CONSTRAINT "_ProjectPitchToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "project_pitches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectPitchToSkill" ADD CONSTRAINT "_ProjectPitchToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
