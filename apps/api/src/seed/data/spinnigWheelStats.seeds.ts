import { PrismaClient, SpinningWheelData } from '@prisma/client';

type ISpinningWheelData = Omit<SpinningWheelData, 'createdAt' | 'updatedAt'>;

const spinningWheelStatsSeed: ISpinningWheelData[] = [
  {
    id: 'ckz002abcd00000000000001',
    startDate: new Date('2024-10-04T00:00:00.000Z'),
    totalParticipants: 65,
    participantsRedeemedCode: 40,
  },
  {
    id: 'ckz002abcd00000000000002',
    startDate: new Date('2024-10-11T00:00:00.000Z'),
    totalParticipants: 70,
    participantsRedeemedCode: 45,
  },
  {
    id: 'ckz002abcd00000000000003',
    startDate: new Date('2024-10-18T00:00:00.000Z'),
    totalParticipants: 75,
    participantsRedeemedCode: 50,
  },
  {
    id: 'ckz002abcd00000000000004',
    startDate: new Date('2024-10-25T00:00:00.000Z'),
    totalParticipants: 80,
    participantsRedeemedCode: 55,
  },
  {
    id: 'ckz002abcd00000000000005',
    startDate: new Date('2024-11-01T00:00:00.000Z'),
    totalParticipants: 85,
    participantsRedeemedCode: 60,
  },
  {
    id: 'ckz002abcd00000000000006',
    startDate: new Date('2024-11-08T00:00:00.000Z'),
    totalParticipants: 90,
    participantsRedeemedCode: 65,
  },
  {
    id: 'ckz002abcd00000000000007',
    startDate: new Date('2024-11-15T00:00:00.000Z'),
    totalParticipants: 95,
    participantsRedeemedCode: 70,
  },
  {
    id: 'ckz002abcd00000000000008',
    startDate: new Date('2024-11-22T00:00:00.000Z'),
    totalParticipants: 100,
    participantsRedeemedCode: 75,
  },
  {
    id: 'ckz002abcd00000000000009',
    startDate: new Date('2024-11-29T00:00:00.000Z'),
    totalParticipants: 105,
    participantsRedeemedCode: 78,
  },
  {
    id: 'ckz002abcd00000000000010',
    startDate: new Date('2024-12-06T00:00:00.000Z'),
    totalParticipants: 110,
    participantsRedeemedCode: 80,
  },
  {
    id: 'ckz002abcd00000000000011',
    startDate: new Date('2024-12-13T00:00:00.000Z'),
    totalParticipants: 115,
    participantsRedeemedCode: 85,
  },
  {
    id: 'ckz002abcd00000000000012',
    startDate: new Date('2024-12-20T00:00:00.000Z'),
    totalParticipants: 120,
    participantsRedeemedCode: 88,
  },
  {
    id: 'ckz002abcd00000000000013',
    startDate: new Date('2024-12-27T00:00:00.000Z'),
    totalParticipants: 125,
    participantsRedeemedCode: 90,
  },
  {
    id: 'ckz002abcd00000000000014',
    startDate: new Date('2025-01-03T00:00:00.000Z'),
    totalParticipants: 130,
    participantsRedeemedCode: 95,
  },
  {
    id: 'ckz002abcd00000000000015',
    startDate: new Date('2025-01-10T00:00:00.000Z'),
    totalParticipants: 135,
    participantsRedeemedCode: 98,
  },
  {
    id: 'ckz002abcd00000000000016',
    startDate: new Date('2025-01-17T00:00:00.000Z'),
    totalParticipants: 140,
    participantsRedeemedCode: 100,
  },
  {
    id: 'ckz002abcd00000000000017',
    startDate: new Date('2025-01-24T00:00:00.000Z'),
    totalParticipants: 145,
    participantsRedeemedCode: 105,
  },
  {
    id: 'ckz002abcd00000000000018',
    startDate: new Date('2025-01-31T00:00:00.000Z'),
    totalParticipants: 150,
    participantsRedeemedCode: 108,
  },
  {
    id: 'ckz002abcd00000000000019',
    startDate: new Date('2025-02-07T00:00:00.000Z'),
    totalParticipants: 155,
    participantsRedeemedCode: 110,
  },
  {
    id: 'ckz002abcd00000000000020',
    startDate: new Date('2025-02-14T00:00:00.000Z'),
    totalParticipants: 160,
    participantsRedeemedCode: 115,
  },
  {
    id: 'ckz002abcd00000000000021',
    startDate: new Date('2025-02-21T00:00:00.000Z'),
    totalParticipants: 165,
    participantsRedeemedCode: 118,
  },
  {
    id: 'ckz002abcd00000000000022',
    startDate: new Date('2025-02-28T00:00:00.000Z'),
    totalParticipants: 170,
    participantsRedeemedCode: 120,
  },
  {
    id: 'ckz002abcd00000000000023',
    startDate: new Date('2025-03-07T00:00:00.000Z'),
    totalParticipants: 175,
    participantsRedeemedCode: 125,
  },
  {
    id: 'ckz002abcd00000000000024',
    startDate: new Date('2025-03-14T00:00:00.000Z'),
    totalParticipants: 180,
    participantsRedeemedCode: 128,
  },
  {
    id: 'ckz002abcd00000000000025',
    startDate: new Date('2025-03-21T00:00:00.000Z'),
    totalParticipants: 185,
    participantsRedeemedCode: 130,
  },
  {
    id: 'ckz002abcd00000000000026',
    startDate: new Date('2025-03-28T00:00:00.000Z'),
    totalParticipants: 190,
    participantsRedeemedCode: 135,
  },
  {
    id: 'ckz002abcd00000000000027',
    startDate: new Date('2025-04-04T00:00:00.000Z'),
    totalParticipants: 195,
    participantsRedeemedCode: 138,
  },
  {
    id: 'ckz002abcd00000000000028',
    startDate: new Date('2025-04-11T00:00:00.000Z'),
    totalParticipants: 200,
    participantsRedeemedCode: 140,
  },
  {
    id: 'ckz002abcd00000000000029',
    startDate: new Date('2025-04-18T00:00:00.000Z'),
    totalParticipants: 205,
    participantsRedeemedCode: 145,
  },
  {
    id: 'ckz002abcd00000000000030',
    startDate: new Date('2025-04-25T00:00:00.000Z'),
    totalParticipants: 210,
    participantsRedeemedCode: 148,
  },
  {
    id: 'ckz002abcd00000000000031',
    startDate: new Date('2025-05-02T00:00:00.000Z'),
    totalParticipants: 215,
    participantsRedeemedCode: 150,
  },
  {
    id: 'ckz002abcd00000000000032',
    startDate: new Date('2025-05-09T00:00:00.000Z'),
    totalParticipants: 220,
    participantsRedeemedCode: 155,
  },
  {
    id: 'ckz002abcd00000000000033',
    startDate: new Date('2025-05-16T00:00:00.000Z'),
    totalParticipants: 225,
    participantsRedeemedCode: 158,
  },
  {
    id: 'ckz002abcd00000000000034',
    startDate: new Date('2025-05-23T00:00:00.000Z'),
    totalParticipants: 230,
    participantsRedeemedCode: 160,
  },
  {
    id: 'ckz002abcd00000000000035',
    startDate: new Date('2025-05-30T00:00:00.000Z'),
    totalParticipants: 235,
    participantsRedeemedCode: 165,
  },
  {
    id: 'ckz002abcd00000000000036',
    startDate: new Date('2025-06-06T00:00:00.000Z'),
    totalParticipants: 240,
    participantsRedeemedCode: 168,
  },
  {
    id: 'ckz002abcd00000000000037',
    startDate: new Date('2025-06-13T00:00:00.000Z'),
    totalParticipants: 245,
    participantsRedeemedCode: 170,
  },
  {
    id: 'ckz002abcd00000000000038',
    startDate: new Date('2025-06-20T00:00:00.000Z'),
    totalParticipants: 250,
    participantsRedeemedCode: 175,
  },
  {
    id: 'ckz002abcd00000000000039',
    startDate: new Date('2025-06-27T00:00:00.000Z'),
    totalParticipants: 255,
    participantsRedeemedCode: 178,
  },
  {
    id: 'ckz002abcd00000000000040',
    startDate: new Date('2025-07-04T00:00:00.000Z'),
    totalParticipants: 260,
    participantsRedeemedCode: 180,
  },
  {
    id: 'ckz002abcd00000000000041',
    startDate: new Date('2025-07-11T00:00:00.000Z'),
    totalParticipants: 265,
    participantsRedeemedCode: 185,
  },
  {
    id: 'ckz002abcd00000000000042',
    startDate: new Date('2025-07-18T00:00:00.000Z'),
    totalParticipants: 270,
    participantsRedeemedCode: 188,
  },
  {
    id: 'ckz002abcd00000000000043',
    startDate: new Date('2025-07-25T00:00:00.000Z'),
    totalParticipants: 275,
    participantsRedeemedCode: 190,
  },
  {
    id: 'ckz002abcd00000000000044',
    startDate: new Date('2025-08-01T00:00:00.000Z'),
    totalParticipants: 280,
    participantsRedeemedCode: 195,
  },
  {
    id: 'ckz002abcd00000000000045',
    startDate: new Date('2025-08-08T00:00:00.000Z'),
    totalParticipants: 275,
    participantsRedeemedCode: 192,
  },
  {
    id: 'ckz002abcd00000000000046',
    startDate: new Date('2025-08-15T00:00:00.000Z'),
    totalParticipants: 270,
    participantsRedeemedCode: 188,
  },
  {
    id: 'ckz002abcd00000000000047',
    startDate: new Date('2025-08-22T00:00:00.000Z'),
    totalParticipants: 265,
    participantsRedeemedCode: 185,
  },
  {
    id: 'ckz002abcd00000000000048',
    startDate: new Date('2025-08-29T00:00:00.000Z'),
    totalParticipants: 260,
    participantsRedeemedCode: 182,
  },
  {
    id: 'ckz002abcd00000000000049',
    startDate: new Date('2025-09-05T00:00:00.000Z'),
    totalParticipants: 255,
    participantsRedeemedCode: 178,
  },
  {
    id: 'ckz002abcd00000000000050',
    startDate: new Date('2025-09-12T00:00:00.000Z'),
    totalParticipants: 250,
    participantsRedeemedCode: 175,
  },
  {
    id: 'ckz002abcd00000000000051',
    startDate: new Date('2025-09-19T00:00:00.000Z'),
    totalParticipants: 245,
    participantsRedeemedCode: 172,
  },
  {
    id: 'ckz002abcd00000000000052',
    startDate: new Date('2025-09-26T00:00:00.000Z'),
    totalParticipants: 240,
    participantsRedeemedCode: 168,
  },
  {
    id: 'ckz002abcd00000000000053',
    startDate: new Date('2025-10-03T00:00:00.000Z'),
    totalParticipants: 235,
    participantsRedeemedCode: 165,
  },
  {
    id: 'ckz002abcd00000000000054',
    startDate: new Date('2025-10-10T00:00:00.000Z'),
    totalParticipants: 230,
    participantsRedeemedCode: 162,
  },
];

const prisma = new PrismaClient();

export const seedSpinningWheelStats = async () => {
  await prisma.spinningWheelData.createMany({
    data: spinningWheelStatsSeed,
    skipDuplicates: true,
  });
};
