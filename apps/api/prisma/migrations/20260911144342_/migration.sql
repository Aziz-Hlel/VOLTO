/*
  Warnings:

  - You are about to drop the column `membershipExpiryDate` on the `MembershipApplication` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MembershipDuration" AS ENUM ('MONTH', 'QUARTER', 'YEAR');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('REDEEM', 'RENEWAL', 'EARN');

-- AlterTable
ALTER TABLE "MembershipApplication" DROP COLUMN "membershipExpiryDate",
ADD COLUMN     "membershipDuration" "MembershipDuration",
ADD COLUMN     "membershipEndDate" DATE;

-- CreateTable
CREATE TABLE "MemberTransactionHistory" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "membershipId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberTransactionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberTransactionHistory" ADD CONSTRAINT "MemberTransactionHistory_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "MembershipApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
