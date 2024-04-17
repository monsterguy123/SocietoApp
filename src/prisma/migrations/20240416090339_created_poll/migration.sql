/*
  Warnings:

  - You are about to drop the column `userId` on the `Voted` table. All the data in the column will be lost.
  - You are about to drop the `_UserToVoted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToVoted" DROP CONSTRAINT "_UserToVoted_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVoted" DROP CONSTRAINT "_UserToVoted_B_fkey";

-- AlterTable
ALTER TABLE "Voted" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT[];

-- DropTable
DROP TABLE "_UserToVoted";
