import type { StaffResponseDto } from "@/types/staff/StaffResponseDto";
import { apiService } from "../apiService";
import apiRoutes from "../routes";
import type { StaffRequestDto } from "@/types/staff/StaffRequestDto";

const staffService = {
  list: () => apiService.getThrowable<StaffResponseDto[]>(apiRoutes.staff.list()),

  get: (id: string) => apiService.getThrowable<StaffResponseDto>(apiRoutes.staff.get(id)),

  create: (payload: StaffRequestDto) =>
    apiService.postThrowable<StaffResponseDto>(apiRoutes.staff.create(), payload),

  update: (id: string, payload: StaffRequestDto) =>
    apiService.patchThrowable<StaffResponseDto>(apiRoutes.staff.update(id), payload),

  delete: (id: string) => apiService.deleteThrowable<StaffResponseDto>(apiRoutes.staff.delete(id)),
};

export default staffService;
