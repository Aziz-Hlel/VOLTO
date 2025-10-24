import type { User } from "@/types/user";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const userService = {
  getUsers: (queryParams: string) => {
    return apiService.getThrowable<{
      data: User[];
      pagination: { page: number; limit: number; total: number };
    }>(apiRoutes.user.getPage(), { params: queryParams });
  },
};
