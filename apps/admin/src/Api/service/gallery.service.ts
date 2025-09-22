import { apiService } from "@/service/Api/apiService";
import apiRoutes from "../routes";



const galleryService = {

    list : (data: sigInSchema) => apiService.postThrowable<sigInApiResponse>(apiRoutes.gallery.list, data),


}


export default galleryService;