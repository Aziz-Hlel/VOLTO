import type { EventType } from "./EventType";

export type EventResponseDto = {
  id: string;
  name: string;
  description: string;
  type: EventType;
  startDate: Date | null;
  endDate: Date | null;
  cronStartDate: string | null;
  cronEndDate: string | null;
  isLadiesNight: boolean;

  createdAt: Date;
  updatedAt: Date;

  thumbnail: {
    s3Key: string;
    url: string;
  };
  video: {
    s3Key: string;
    url: string;
  };
};
