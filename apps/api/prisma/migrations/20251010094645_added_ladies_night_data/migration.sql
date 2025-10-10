-- CreateTable
CREATE TABLE "public"."LadiesNightData" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "totalParticipants" INTEGER NOT NULL,
    "participantWithAllRedeemedDrinks" INTEGER NOT NULL,
    "drinkQuota" INTEGER NOT NULL,

    CONSTRAINT "LadiesNightData_pkey" PRIMARY KEY ("id")
);
