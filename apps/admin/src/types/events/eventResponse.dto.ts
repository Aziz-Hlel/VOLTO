import type { EventType } from "./EventType";



export type EventResponseDto = {
    
    thumbnail: {
        s3Key: string;
        url: string;
    };
    video: {
        s3Key: string;
        url: string;
    };
    name: string;
    type: EventType;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
    cronStartDate: string | null;
    cronEndDate: string | null;
    id: string;
    isLadiesNight: boolean;
    createdAt: Date;
    updatedAt: Date;
}