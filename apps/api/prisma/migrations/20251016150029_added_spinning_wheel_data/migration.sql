-- CreateTable
CREATE TABLE "public"."SpinningWheelData" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "totalParticipants" INTEGER NOT NULL,
    "participantsRedeemedCode" INTEGER NOT NULL,

    CONSTRAINT "SpinningWheelData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpinningWheelData_startDate_key" ON "public"."SpinningWheelData"("startDate");
