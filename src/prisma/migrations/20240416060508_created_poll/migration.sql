/*
  Warnings:

  - Added the required column `society` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "society" TEXT NOT NULL;
