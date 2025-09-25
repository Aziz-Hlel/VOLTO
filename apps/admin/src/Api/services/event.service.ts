import { apiService } from "@/Api/apiService";
import apiRoutes from "../routes";
import type { Pageable } from "@/types/Pageable";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";
import type { CreateEventDto } from "@/types/events/CreateEventRequest.dto";



const eventService = {

    list: (queryParams: Pageable) => apiService.getThrowable<EventResponseDto>(apiRoutes.events.list, { data: queryParams }),
    create: (payload: CreateEventDto) => apiService.postThrowable<EventResponseDto>(apiRoutes.events.create, payload),

}

export default eventService;