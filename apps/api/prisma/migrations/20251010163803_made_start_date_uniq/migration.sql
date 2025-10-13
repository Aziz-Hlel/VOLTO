/*
  Warnings:

  - A unique constraint covering the columns `[startDate]` on the table `LadiesNightData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LadiesNightData_startDate_key" ON "public"."LadiesNightData"("startDate");
