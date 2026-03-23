-- CreateEnum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Gender') THEN
    CREATE TYPE "Gender" AS ENUM ('M', 'F', 'UNKNOWN');
  END IF;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Author" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Author_email_key" ON "Author"("email");

-- AlterTable
ALTER TABLE "Book" ADD COLUMN IF NOT EXISTS "authorId" INTEGER;

-- AddForeignKey
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'Book_authorId_fkey'
      AND table_name = 'Book'
  ) THEN
    ALTER TABLE "Book"
      ADD CONSTRAINT "Book_authorId_fkey"
      FOREIGN KEY ("authorId") REFERENCES "Author"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
