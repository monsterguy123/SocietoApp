-- CreateEnum
CREATE TYPE "level" AS ENUM ('Beginners', 'Intermediate', 'Advance');

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Instructor" TEXT NOT NULL,
    "Categories" TEXT NOT NULL,
    "Level" "level" NOT NULL,
    "Price" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION NOT NULL,
    "Description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "CourseId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_userId_key" ON "Course"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_key" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_CourseId_key" ON "Review"("CourseId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
