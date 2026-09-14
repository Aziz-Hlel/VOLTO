/*
  Warnings:

  - You are about to drop the column `membershipEndDate` on the `MembershipApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MembershipApplication" DROP COLUMN "membershipEndDate",
ADD COLUMN     "membershipExpiryDate" DATE;
