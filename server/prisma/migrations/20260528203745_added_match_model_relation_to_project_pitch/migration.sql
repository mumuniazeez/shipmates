-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "projectPitchId" TEXT;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_projectPitchId_fkey" FOREIGN KEY ("projectPitchId") REFERENCES "project_pitches"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
