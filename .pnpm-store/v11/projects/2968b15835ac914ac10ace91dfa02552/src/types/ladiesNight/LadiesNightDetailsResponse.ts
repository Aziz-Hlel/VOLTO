import type { EventResponseDto } from "../events/eventResponse.dto";

export type LadiesNightDetailsResponse = Omit<EventResponseDto, "thumbnail" | "video">;
