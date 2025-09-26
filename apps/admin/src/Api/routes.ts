import ENV from "../utils/env.variables";



const apiRoutes = {

    baseUrl: ENV.BASE_URL,

    auth: {
        me: () => "/auth/me" as const,
        login: () => "/auth/login" as const,
        refresh: () => "/auth/refresh" as const,
        signUp: () => "/auth/register/" as const,
    },
    staff: {
        list: () => '/users/staff' as const,

    },

    gallery: {
        list: () => '/gallery/' as const,
    },

    events: {
        list: () => '/events/list' as const,
        get: (eventId: string) => `/events/${eventId}` as const,
        create: () => '/events/' as const,
        update: (eventId: string) => `/events/${eventId}` as const,
        delete: (eventId: string) => `/events/${eventId}` as const,
    },

    media: {
        presignedUrl: () => '/media/presigned-url' as const,
    },

    images: () => ENV.BASE_URL + "/images/",


}




export default apiRoutes;