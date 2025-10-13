/*
  Warnings:

  - Added the required column `totalDrinksConsumed` to the `LadiesNightData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."LadiesNightData" ADD COLUMN     "totalDrinksConsumed" INTEGER NOT NULL;
