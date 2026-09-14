/*
  Warnings:

  - The values [APPROVED] on the enum `MembershipStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MembershipStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED', 'EXPIRED');
ALTER TABLE "public"."MembershipApplication" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MembershipApplication" ALTER COLUMN "status" TYPE "MembershipStatus_new" USING ("status"::text::"MembershipStatus_new");
ALTER TYPE "MembershipStatus" RENAME TO "MembershipStatus_old";
ALTER TYPE "MembershipStatus_new" RENAME TO "MembershipStatus";
DROP TYPE "public"."MembershipStatus_old";
ALTER TABLE "MembershipApplication" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
