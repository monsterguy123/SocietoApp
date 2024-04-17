/*
  Warnings:

  - You are about to alter the column `Rating` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `EndDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "EndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "StartDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "Rating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
