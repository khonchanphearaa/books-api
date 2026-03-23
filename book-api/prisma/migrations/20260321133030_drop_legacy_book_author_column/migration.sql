-- Remove legacy text author column from Book.
-- The app now uses authorId relation to Author table.
ALTER TABLE "Book" DROP COLUMN IF EXISTS "author";
