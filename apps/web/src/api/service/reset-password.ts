import type { ConfirmPasswordRequestDto } from "@/types/reset-password/confirm-password-request.dto";
import { apiService } from "../apiService";
import apiRoutes from "../routes";



const resetPassowrdService = {

    confirm : async(payload:ConfirmPasswordRequestDto)=> await apiService.postThrowable(apiRoutes.resetPassword.confirm(), payload)

} as const;


export default resetPassowrdService;