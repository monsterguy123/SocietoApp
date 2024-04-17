/*
  Warnings:

  - You are about to drop the column `CreateAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "CreateAt",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "options" TEXT[],
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voted" (
    "id" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "vote" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "PollId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToVoted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVoted_AB_unique" ON "_UserToVoted"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVoted_B_index" ON "_UserToVoted"("B");

-- AddForeignKey
ALTER TABLE "Voted" ADD CONSTRAINT "Voted_PollId_fkey" FOREIGN KEY ("PollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVoted" ADD CONSTRAINT "_UserToVoted_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVoted" ADD CONSTRAINT "_UserToVoted_B_fkey" FOREIGN KEY ("B") REFERENCES "Voted"("id") ON DELETE CASCADE ON UPDATE CASCADE;
