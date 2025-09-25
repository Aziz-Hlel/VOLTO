import ENV from "../utils/env.variables";



const apiRoutes = {

    baseUrl: ENV.BASE_URL,

    auth: {
        me: () => "/auth/me" as const,
        login: () => "/auth/login" as const,
        refresh: () => "/auth/refresh" as const,
        signUp: () => "/auth/register/" as const,
    },

    gallery: {
        list: () => '/gallery/' as const,
    },

    events: {
        create: () => '/events/' as const,
        list: () => '/events/list' as const,
        get: (eventId: string) => `/events/${eventId}`,
    },

    media: {
        presignedUrl: () => '/media/presigned-url' as const,
    },

    images: () => ENV.BASE_URL + "/images/",


}




export default apiRoutes;