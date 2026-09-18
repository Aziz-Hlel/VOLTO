/*
  Warnings:

  - You are about to drop the column `applicationReceivedBy` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `approvalBy` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `dateApproved` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `membershipCardSerialNumber` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `membershipDuration` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `membershipExpiryDate` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `membershipId` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `membershipNumber` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `membershipNumberIssued` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `membershipStartDate` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `MembershipApplication` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `MembershipApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MemberTransactionHistory" DROP CONSTRAINT "MemberTransactionHistory_membershipId_fkey";

-- AlterTable
ALTER TABLE "MembershipApplication" DROP COLUMN "applicationReceivedBy",
DROP COLUMN "approvalBy",
DROP COLUMN "balance",
DROP COLUMN "dateApproved",
DROP COLUMN "membershipCardSerialNumber",
DROP COLUMN "membershipDuration",
DROP COLUMN "membershipExpiryDate",
DROP COLUMN "membershipId",
DROP COLUMN "membershipNumber",
DROP COLUMN "membershipNumberIssued",
DROP COLUMN "membershipStartDate",
DROP COLUMN "remarks",
DROP COLUMN "status";

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "membershipUid" SERIAL NOT NULL,
    "membershipStartDate" DATE NOT NULL,
    "membershipExpiryDate" DATE NOT NULL,
    "membershipDuration" "MembershipDuration",
    "membershipNumber" SERIAL NOT NULL,
    "applicationReceivedBy" TEXT NOT NULL,
    "membershipNumberIssued" TEXT NOT NULL,
    "membershipCardSerialNumber" TEXT NOT NULL,
    "approvalBy" TEXT NOT NULL,
    "dateApproved" DATE NOT NULL,
    "remarks" TEXT NOT NULL,
    "status" "MembershipStatus" NOT NULL DEFAULT 'ACTIVE',
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "membershipApplicationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- Reset membershipUid sequence to start from 1000
ALTER SEQUENCE "Membership_membershipUid_seq" RESTART WITH 1000;

-- CreateIndex
CREATE UNIQUE INDEX "Membership_membershipUid_key" ON "Membership"("membershipUid");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_membershipNumber_key" ON "Membership"("membershipNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_membershipApplicationId_key" ON "Membership"("membershipApplicationId");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_membershipApplicationId_fkey" FOREIGN KEY ("membershipApplicationId") REFERENCES "MembershipApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberTransactionHistory" ADD CONSTRAINT "MemberTransactionHistory_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
