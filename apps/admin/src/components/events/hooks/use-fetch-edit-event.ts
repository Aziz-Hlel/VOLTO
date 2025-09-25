import eventService from "@/Api/services/event.service";
import { useQuery } from "@tanstack/react-query";


const useFetchEditEvent = ({ eventId }: { eventId?: string }) => {

    // const {} = useApiQuery<EventResponseDto[]>({
    //     url: eventService.list,
    //     queryParams: { page: 1, limit: 50 },
    //     queryKey: ['events'],
    //     options: { enabled: true, config: { params: { page: 1, limit: 50 } } },
    // });

    // const apiFunc = (eventId: string) => eventService.get(eventId);

    const { data, isLoading, } = useQuery({
        queryKey: ['event', eventId],
        queryFn: () => eventService.get(eventId!),
        enabled: !!eventId
    })

    const payload = data?.data

    return {
        payload,
        isLoading,
    }

}



export default useFetchEditEvent;