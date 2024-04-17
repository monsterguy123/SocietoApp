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
ALTER TABLE "_UserToVoted" ADD CONSTRAINT "_UserToVoted_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVoted" ADD CONSTRAINT "_UserToVoted_B_fkey" FOREIGN KEY ("B") REFERENCES "Voted"("id") ON DELETE CASCADE ON UPDATE CASCADE;
