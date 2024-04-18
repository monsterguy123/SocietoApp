/*
  Warnings:

  - You are about to drop the column `Fees` on the `User` table. All the data in the column will be lost.
  - Added the required column `FeesId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fees" ALTER COLUMN "isSubmitted" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Fees",
ADD COLUMN     "FeesId" TEXT NOT NULL;
