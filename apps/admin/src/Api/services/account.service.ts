import axios from "axios";
import { apiService } from "../apiService";
import type { User } from "@/types/user";
import apiRoutes from "../routes";

const accountService = {
  me: async () => await apiService.getThrowable<User>(apiRoutes.auth.me()),
  update: async (data: Partial<User>) =>
    await apiService.putThrowable<User>(apiRoutes.account.updateAccount(), data),
};

export default accountService;
