/*
  Warnings:

  - Added the required column `performedById` to the `MemberTransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberTransactionHistory" ADD COLUMN     "performedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MemberTransactionHistory" ADD CONSTRAINT "MemberTransactionHistory_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
