/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `MembershipApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "MembershipApplication" ADD COLUMN     "status" "MembershipStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "MembershipApplication_email_key" ON "MembershipApplication"("email");
