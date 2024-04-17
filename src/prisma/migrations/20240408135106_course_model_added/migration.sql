/*
  Warnings:

  - Changed the type of `Price` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "Price",
ADD COLUMN     "Price" INTEGER NOT NULL,
ALTER COLUMN "EndDate" SET DATA TYPE TEXT,
ALTER COLUMN "StartDate" SET DATA TYPE TEXT;
