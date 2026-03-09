-- Clean DB
BEGIN;

-- Delete all rows from the "Vote" table
DELETE FROM public."Vote";

-- Reset the serial sequence for the "Vote" table
ALTER SEQUENCE public."Vote_id_seq" RESTART WITH 1;

-- Delete all rows from the "Survey" table and its dependencies
DELETE FROM public."Survey" CASCADE;

-- Reset the serial sequence for the "Survey" table
ALTER SEQUENCE public."Survey_id_seq" RESTART WITH 1;

-- Delete all rows from the "Answer" table and its dependencies
DELETE FROM public."Answer" CASCADE;

-- Reset the serial sequence for the "Answer" table
ALTER SEQUENCE public."Answer_id_seq" RESTART WITH 1;

-- Delete all rows from the "User" table
DELETE FROM public."User";

-- Reset the serial sequence for the "User" table
ALTER SEQUENCE public."User_id_seq" RESTART WITH 1;

COMMIT;


-- Drops
BEGIN;

-- Drop the "Vote" table and its dependencies
DROP TABLE IF EXISTS public."Vote" CASCADE;

-- Drop the "Survey" table and its dependencies
DROP TABLE IF EXISTS public."Survey" CASCADE;

-- Drop the "Answer" table and its dependencies
DROP TABLE IF EXISTS public."Answer" CASCADE;

-- Drop the "User" table
DROP TABLE IF EXISTS public."User";

COMMIT;