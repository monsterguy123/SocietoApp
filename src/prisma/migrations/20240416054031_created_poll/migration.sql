/*
  Warnings:

  - Added the required column `AdminId` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "AdminId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
