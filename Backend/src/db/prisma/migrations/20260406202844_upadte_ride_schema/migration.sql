/*
  Warnings:

  - The values [ACCEPTING] on the enum `checkRide` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "checkRide_new" AS ENUM ('SEARCHING', 'CANCELED', 'COMPLETE');
ALTER TABLE "public"."Ride" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Ride" ALTER COLUMN "status" TYPE "checkRide_new" USING ("status"::text::"checkRide_new");
ALTER TYPE "checkRide" RENAME TO "checkRide_old";
ALTER TYPE "checkRide_new" RENAME TO "checkRide";
DROP TYPE "public"."checkRide_old";
ALTER TABLE "Ride" ALTER COLUMN "status" SET DEFAULT 'SEARCHING';
COMMIT;
