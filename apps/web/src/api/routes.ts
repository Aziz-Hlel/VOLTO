import ENV from "@/config/ENV";


const apiRoutes= {

    baseUrl: ENV.VITE_API_URL,

    resetPassword:{
      confirm: ()=> '/reset-password/confirm' as const,
    }


}


export default apiRoutes;