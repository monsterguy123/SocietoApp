/*
  Warnings:

  - You are about to drop the column `amount` on the `Fees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fees" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "userSubmitted" ADD COLUMN     "donation" INTEGER NOT NULL DEFAULT 0;
