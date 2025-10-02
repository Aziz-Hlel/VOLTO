import type { ConfirmPasswordRequestDto } from "@/types/reset-password/confirm-password-request.dto";
import { apiService } from "../apiService";
import apiRoutes from "../routes";
import type { ConfirmPasswordResponseDto } from "@/types/reset-password/confirm-password-response.dto";

const resetPassowrdService = {
  confirm: async (payload: ConfirmPasswordRequestDto) =>
    await apiService.post<ConfirmPasswordResponseDto>(apiRoutes.resetPassword.confirm(), payload),
} as const;

export default resetPassowrdService;
