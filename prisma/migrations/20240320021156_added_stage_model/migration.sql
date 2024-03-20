/*
  Warnings:

  - You are about to drop the column `stage` on the `Status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Status" DROP COLUMN "stage",
ADD COLUMN     "stageId" INTEGER;

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "stage" INTEGER NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
