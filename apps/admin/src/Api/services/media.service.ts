import type { PreSignedUrlRequest } from "@/types/media/PreSignedUrlRequest";
import { apiService } from "../apiService";
import apiRoutes from "../routes";
import type { PreSignedUrlResponse } from "@/types/media/PreSignedUrlResponse";

const mediaService = {
  presignedUrl: async (preSignedUrlDto: PreSignedUrlRequest) =>
    await apiService.postThrowable<PreSignedUrlResponse>(
      apiRoutes.media.presignedUrl(),
      preSignedUrlDto,
    ),
};

export default mediaService;
