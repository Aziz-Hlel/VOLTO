import type { Event, Media } from '@prisma/client';
import { EntityType, EventType, MediaStatus, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import {
  eidThumbnail,
  eidVideo,
  fridayBrunchThumbnail,
  fridayBrunchVideo,
  halloweenThumbnail,
  halloweenVideo,
  hookasNightThumbnail,
  hookasNightVideo,
  LadiesNightThumbnail,
  LadiesNightVideo,
  newYearEveThumbnail,
  newYearEveVideo,
  seedMedia,
} from './media.seeds';

const prisma = new PrismaClient();

type IMediaType = Omit<Media, 'id' | 'createdAt' | 'updatedAt'>;

type IEventSeeds = Omit<Event, 'createdAt' | 'updatedAt'> & {
  thumnail: IMediaType;
  video: IMediaType;
};

const now = new Date();

const oneMinute = 60 * 1000;
const oneMinuteLater = new Date(now.getTime() + oneMinute);
const fiveMinuteLater = new Date(now.getTime() + oneMinute * 61);

const eventSeeds: IEventSeeds[] = [
  {
    id: '5e3b7f1c-2d4a-4f6e-9a8b-1c2d3e4f5a6b',
    name: 'Ladies Night',
    description: `Ladies Night at Volto is where elegance meets energy. We celebrate the ladies with exclusive perks — including complimentary drinks to start the night right. Enjoy handcrafted cocktails, vibrant music from our live DJ, and a lively atmosphere that’s perfect for catching up, dancing, and making memories. Whether it’s a midweek escape or a pre-weekend celebration, Volto is the place to unwind, shine, and own the night.`,
    startDate: null,
    endDate: null,
    cronStartDate: '30 15 * * 4',
    cronEndDate: '0 16 * * 4',
    type: EventType.WEEKLY,
    isLadiesNight: true,
    thumnail: LadiesNightThumbnail('5e3b7f1c-2d4a-4f6e-9a8b-1c2d3e4f5a6b'),
    video: LadiesNightVideo('5e3b7f1c-2d4a-4f6e-9a8b-1c2d3e4f5a6b'),
  },
  // {
  //   id: '8a1c3d5e-7f2b-4a6d-9e1c-3b4f5a6d7e8f',
  //   name: 'Friday Brunch',
  //   description: `Friday Brunch at Volto brings a fresh twist to the weekend kickoff — where flavor, music, and atmosphere blend into the perfect daytime escape. Indulge in curated brunch plates, crafted cocktails, and laid-back lounge vibes as our DJ sets the tone for an afternoon that effortlessly transitions from brunch to beats. Whether you’re catching up with friends or easing into the weekend in style, Volto’s Friday Brunch is your weekly destination for great food, great drinks, and even better company.`,
  //   startDate: null,
  //   endDate: null,
  //   cronStartDate: '0 14 * * 5',
  //   cronEndDate: '0 17 * * 5',
  //   type: EventType.WEEKLY,
  //   isLadiesNight: false,
  //   thumnail: fridayBrunchThumbnail('8a1c3d5e-7f2b-4a6d-9e1c-3b4f5a6d7e8f'),
  //   video: fridayBrunchVideo('8a1c3d5e-7f2b-4a6d-9e1c-3b4f5a6d7e8f'),
  // },
  {
    id: '3f7a1d5c-2b6e-4a8f-9c1b-5d2e3f4a6b7c',
    name: 'Chichas Night',
    description: `Chichas Night at Volto is the perfect midweek escape where smooth flavors, chilled vibes, and great company come together. Ladies enjoy a complimentary Chicha as they relax and socialize, while our resident DJ provides the perfect soundtrack for a lively yet laid-back evening. Whether you’re unwinding after work or catching up with friends, Volto’s Chichas Night is your go-to spot to savor the night in style.`,
    startDate: null,
    endDate: null,
    cronStartDate: '0 17 * * 1',
    cronEndDate: '0 02 * * 2',
    type: EventType.WEEKLY,
    isLadiesNight: false,
    thumnail: hookasNightThumbnail('3f7a1d5c-2b6e-4a8f-9c1b-5d2e3f4a6b7c'),
    video: hookasNightVideo('3f7a1d5c-2b6e-4a8f-9c1b-5d2e3f4a6b7c'),
  },
  {
    id: 'b6d1e3f4-5a7c-4f2b-8e1a-9c3b2d4f5a6e',
    name: "New Year's Eve",
    description: `Celebrate New Year’s Eve at Volto, where style, music, and energy come together for an unforgettable night. Step into an atmosphere of modern elegance with curated cocktails, vibrant beats from our live DJ, and the company of those ready to welcome 2026 in style. As midnight approaches, raise your glass for a complimentary champagne toast and let the countdown begin surrounded by the glow, rhythm, and excitement that only Volto delivers.`,
    startDate: new Date('2025-12-31T00:00:00.000Z'),
    endDate: new Date('2025-12-31T23:59:59.999Z'),
    cronStartDate: null,
    cronEndDate: null,
    type: EventType.SPECIAL,
    isLadiesNight: false,
    thumnail: newYearEveThumbnail('b6d1e3f4-5a7c-4f2b-8e1a-9c3b2d4f5a6e'),
    video: newYearEveVideo('b6d1e3f4-5a7c-4f2b-8e1a-9c3b2d4f5a6e'),
  },
  {
    id: 'e3b6f5b4-9c5b-4a1e-9212-35d764cfc731',
    name: 'Eid Celebration',
    description: `Celebrate Eid at Volto with an evening of joy, flavor, and togetherness. Join us for a special night filled with signature cocktails, curated small plates, and a lively yet sophisticated atmosphere that honors the spirit of Eid. Whether you’re gathering with friends, family, or colleagues, Volto provides the perfect backdrop for celebration — complete with music, festive décor, and moments to remember. Make this Eid unforgettable with style, laughter, and great company at Volto.`,
    startDate: new Date('2025-08-12T00:00:00.000Z'),
    endDate: new Date('2025-08-15T23:59:59.999Z'),
    cronStartDate: null,
    cronEndDate: null,
    type: EventType.SPECIAL,
    isLadiesNight: false,
    thumnail: eidThumbnail('e3b6f5b4-9c5b-4a1e-9212-35d764cfc731'),
    video: eidVideo('e3b6f5b4-9c5b-4a1e-9212-35d764cfc731'),
  },
  {
    id: '8f14a2b5-b2e3-4a6e-9f72-2cfcb7e9d31f',
    name: 'Halloween Night',
    description: `Halloween Night at Volto invites you to step into a world of spook, style, and celebration. Dress to impress in your most creative costumes and enjoy signature cocktails, haunting beats from our DJ, and a lively atmosphere that sets the stage for an unforgettable night. Whether you’re dancing, socializing, or simply soaking in the spooky vibes, Volto is the place to celebrate Halloween with flair, fun, and friends.`,
    startDate: new Date('2025-03-28T00:00:00.000Z'),
    endDate: new Date('2025-03-30T23:59:59.999Z'),
    cronStartDate: null,
    cronEndDate: null,
    type: EventType.SPECIAL,
    isLadiesNight: false,
    thumnail: halloweenThumbnail('8f14a2b5-b2e3-4a6e-9f72-2cfcb7e9d31f'),
    video: halloweenVideo('8f14a2b5-b2e3-4a6e-9f72-2cfcb7e9d31f'),
  },
];

const seedEvents = async () => {
  for (const eventWithMedia of eventSeeds) {
    const { thumnail, video, ...event } = eventWithMedia;
    await seedMedia(thumnail);
    await seedMedia(video);

    await prisma.event.upsert({
      where: { name: event.name },
      update: event,
      create: event,
    });
  }
};

export default seedEvents;
