/*
  Warnings:

  - You are about to drop the `appSetting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."appSetting";

-- CreateTable
CREATE TABLE "public"."appSettings" (
    "id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "appSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appSettings_field_key" ON "public"."appSettings"("field");

-- CreateIndex
CREATE UNIQUE INDEX "appSettings_value_key" ON "public"."appSettings"("value");

-- CreateIndex
CREATE INDEX "appSettings_field_idx" ON "public"."appSettings"("field");
