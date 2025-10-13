import { LadiesNightData, PrismaClient } from '@prisma/client';

type ILadiesNightData = Omit<LadiesNightData, 'createdAt' | 'updatedAt'>;

const ladiesNightStatsSeed: ILadiesNightData[] = [
  {
    id: 'ckz001abcd00000000000001',
    startDate: new Date('2025-04-05T00:00:00.000Z'),
    totalParticipants: 120,
    participantWithAllRedeemedDrinks: 75,
    totalDrinksConsumed: 310,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000002',
    startDate: new Date('2025-04-12T00:00:00.000Z'),
    totalParticipants: 135,
    participantWithAllRedeemedDrinks: 80,
    totalDrinksConsumed: 340,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000003',
    startDate: new Date('2025-04-19T00:00:00.000Z'),
    totalParticipants: 150,
    participantWithAllRedeemedDrinks: 90,
    totalDrinksConsumed: 380,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000004',
    startDate: new Date('2025-04-26T00:00:00.000Z'),
    totalParticipants: 140,
    participantWithAllRedeemedDrinks: 85,
    totalDrinksConsumed: 355,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000005',
    startDate: new Date('2025-05-03T00:00:00.000Z'),
    totalParticipants: 160,
    participantWithAllRedeemedDrinks: 95,
    totalDrinksConsumed: 405,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000006',
    startDate: new Date('2025-05-10T00:00:00.000Z'),
    totalParticipants: 155,
    participantWithAllRedeemedDrinks: 92,
    totalDrinksConsumed: 398,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000007',
    startDate: new Date('2025-05-17T00:00:00.000Z'),
    totalParticipants: 165,
    participantWithAllRedeemedDrinks: 100,
    totalDrinksConsumed: 420,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000008',
    startDate: new Date('2025-05-24T00:00:00.000Z'),
    totalParticipants: 175,
    participantWithAllRedeemedDrinks: 110,
    totalDrinksConsumed: 460,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000009',
    startDate: new Date('2025-05-31T00:00:00.000Z'),
    totalParticipants: 180,
    participantWithAllRedeemedDrinks: 115,
    totalDrinksConsumed: 470,
    drinkQuota: 3,
  },
  {
    id: 'ckz001abcd00000000000010',
    startDate: new Date('2025-06-07T00:00:00.000Z'),
    totalParticipants: 190,
    participantWithAllRedeemedDrinks: 120,
    totalDrinksConsumed: 490,
    drinkQuota: 3,
  },
];

const prisma = new PrismaClient();

export const seedLadiesNightStats = async () =>
  prisma.ladiesNightData.createMany({
    data: ladiesNightStatsSeed,
    skipDuplicates: true,
  });
