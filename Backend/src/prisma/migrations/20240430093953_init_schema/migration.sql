/*
  Warnings:

  - You are about to drop the column `FeesId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `userSubmitted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Submitter" DROP CONSTRAINT "_Submitter_A_fkey";

-- DropForeignKey
ALTER TABLE "_Submitter" DROP CONSTRAINT "_Submitter_B_fkey";

-- DropForeignKey
ALTER TABLE "userSubmitted" DROP CONSTRAINT "userSubmitted_FeeId_fkey";

-- AlterTable
ALTER TABLE "Fees" ADD COLUMN     "Donations" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "FeesId";

-- DropTable
DROP TABLE "userSubmitted";

-- AddForeignKey
ALTER TABLE "_Submitter" ADD CONSTRAINT "_Submitter_A_fkey" FOREIGN KEY ("A") REFERENCES "Fees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Submitter" ADD CONSTRAINT "_Submitter_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
