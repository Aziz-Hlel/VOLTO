import type { StaffResponseDto } from "@/types/staff/StaffResponseDto";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

const staffService = {
  list: () => apiService.getThrowable<StaffResponseDto[]>(apiRoutes.staff.list()),
};

export default staffService;
