import { apiService } from "@/Api/apiService";
import apiRoutes from "../routes";
import type { Pageable } from "@/types/Pageable";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";



const eventService = {

    list: (queryParams: Pageable) => apiService.getThrowable<EventResponseDto>(apiRoutes.events.list, { data: queryParams }),

}

export default eventService;