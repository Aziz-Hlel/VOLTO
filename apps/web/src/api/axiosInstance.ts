import ENV from "@/config/ENV";
import axios from "axios";



const axiosInstance =   axios.create({
    baseURL: ENV.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });


export default axiosInstance;