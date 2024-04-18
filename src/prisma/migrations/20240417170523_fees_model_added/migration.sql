-- CreateEnum
CREATE TYPE "Role" AS ENUM ('member', 'secretary');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "society" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "Fees" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "options" TEXT[],
    "society" TEXT NOT NULL,
    "AdminId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voted" (
    "id" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "vote" INTEGER NOT NULL DEFAULT 0,
    "PollId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fees" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isSubmitted" BOOLEAN NOT NULL,
    "AdminId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToVoted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Submitter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVoted_AB_unique" ON "_UserToVoted"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVoted_B_index" ON "_UserToVoted"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Submitter_AB_unique" ON "_Submitter"("A", "B");

-- CreateIndex
CREATE INDEX "_Submitter_B_index" ON "_Submitter"("B");

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voted" ADD CONSTRAINT "Voted_PollId_fkey" FOREIGN KEY ("PollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVoted" ADD CONSTRAINT "_UserToVoted_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVoted" ADD CONSTRAINT "_UserToVoted_B_fkey" FOREIGN KEY ("B") REFERENCES "Voted"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Submitter" ADD CONSTRAINT "_Submitter_A_fkey" FOREIGN KEY ("A") REFERENCES "Fees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Submitter" ADD CONSTRAINT "_Submitter_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
