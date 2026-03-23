-- Remove duplicate titles before adding unique constraint.
-- Keep the oldest row (smallest id) for each duplicated title.
WITH duplicates AS (
  SELECT id,
         ROW_NUMBER() OVER (PARTITION BY title ORDER BY id) AS rn
  FROM "Book"
)
DELETE FROM "Book"
WHERE id IN (
  SELECT id
  FROM duplicates
  WHERE rn > 1
);

-- Enforce unique title.
CREATE UNIQUE INDEX IF NOT EXISTS "Book_title_key" ON "Book"("title");
