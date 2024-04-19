/*
  Warnings:

  - You are about to drop the column `Action` on the `ComplaintNotice` table. All the data in the column will be lost.
  - Added the required column `action` to the `ComplaintNotice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComplaintNotice" DROP COLUMN "Action",
ADD COLUMN     "action" TEXT NOT NULL;
