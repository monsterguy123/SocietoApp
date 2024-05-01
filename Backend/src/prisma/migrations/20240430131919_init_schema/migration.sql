/*
  Warnings:

  - You are about to drop the `_UserToVoted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToVoted" DROP CONSTRAINT "_UserToVoted_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVoted" DROP CONSTRAINT "_UserToVoted_B_fkey";

-- DropTable
DROP TABLE "_UserToVoted";

-- CreateTable
CREATE TABLE "_user voted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user voted_AB_unique" ON "_user voted"("A", "B");

-- CreateIndex
CREATE INDEX "_user voted_B_index" ON "_user voted"("B");

-- AddForeignKey
ALTER TABLE "_user voted" ADD CONSTRAINT "_user voted_A_fkey" FOREIGN KEY ("A") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user voted" ADD CONSTRAINT "_user voted_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
