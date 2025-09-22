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
        list: '/gallery/' as const,
    },


    images: ENV.BASE_URL + "/images/",

    getSignedUrl: ENV.BASE_URL + "/images/getSignedUrl",

}




export default apiRoutes;