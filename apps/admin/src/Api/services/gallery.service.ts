import { apiService } from "@/Api/apiService";
import apiRoutes from "../routes";
import type { GetGalleryDto as GalleryQueryParams } from "@/types/gallery/get-gallery.dto";
import type { GalleryResponseDto } from "@/types/gallery/get-gallery.response.dto";



const galleryService = {

    list: (page: GalleryQueryParams) => apiService.getThrowable<GalleryResponseDto>(apiRoutes.gallery.list(), { data: page }),


} 


export default galleryService;