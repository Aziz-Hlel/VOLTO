/*
  Warnings:

  - Made the column `duration` on table `Membership` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "duration" SET NOT NULL;
