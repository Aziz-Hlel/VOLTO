-- CreateTable
CREATE TABLE "public"."appSetting" (
    "id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "appSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appSetting_field_key" ON "public"."appSetting"("field");

-- CreateIndex
CREATE UNIQUE INDEX "appSetting_value_key" ON "public"."appSetting"("value");

-- CreateIndex
CREATE INDEX "appSetting_field_idx" ON "public"."appSetting"("field");
