import { apiService } from "@/Api/apiService";
import apiRoutes from "../routes";
import type { Pageable } from "@/types/Pageable";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";
import type { CreateEventDto } from "@/types/events/CreateEventRequest.dto";

const eventService = {
  list: (queryParams: Pageable) =>
    apiService.getThrowable<EventResponseDto[]>(apiRoutes.events.list(), { data: queryParams }),
  get: (id: string) =>
    apiService.getThrowable<EventResponseDto>(apiRoutes.events.get(id), { data: id }),
  create: (payload: CreateEventDto) =>
    apiService.postThrowable<EventResponseDto>(apiRoutes.events.create(), payload),
  update: (id: string, payload: CreateEventDto) =>
    apiService.putThrowable<EventResponseDto>(apiRoutes.events.update(id), payload),
  delete: (id: string) => apiService.deleteThrowable<EventResponseDto>(apiRoutes.events.delete(id)),
} as const;

export default eventService;
