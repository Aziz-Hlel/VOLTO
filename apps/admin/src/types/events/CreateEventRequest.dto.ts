import type { EventType } from "./EventType";

export type CreateEventDto = {
  name: string;

  type: EventType;

  description: string;

  startDate?: Date;

  endDate?: Date;

  cronStartDate?: string;

  cronEndDate?: string;

  thumbnail: {
    s3Key: string;
    url?: string;
  };

  video: {
    s3Key: string;
    url?: string;
  };
};
