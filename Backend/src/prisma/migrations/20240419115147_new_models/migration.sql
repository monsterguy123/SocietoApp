/*
  Warnings:

  - A unique constraint covering the columns `[complaintId]` on the table `ComplaintNotice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `complaintId` to the `ComplaintNotice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComplaintNotice" ADD COLUMN     "complaintId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ComplaintNotice_complaintId_key" ON "ComplaintNotice"("complaintId");

-- AddForeignKey
ALTER TABLE "ComplaintNotice" ADD CONSTRAINT "ComplaintNotice_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "ComplaintRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
