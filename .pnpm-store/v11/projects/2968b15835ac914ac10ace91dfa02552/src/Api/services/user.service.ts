import type { User } from "@/types/user";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const userService = {
  getUsers: (queryParams: URLSearchParams) => {
    return apiService.getThrowable<{
      data: User[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>(apiRoutes.user.getPage(), { params: queryParams });
  },
};
