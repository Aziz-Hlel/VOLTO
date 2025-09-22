import type { sigInSchema } from "@/schemas/signInSchema";
import apiRoutes from "../../../Api/routes";
import { apiService } from "../apiService";
import type { sigInApiResponse, signUpApiResponse } from "@/types/Apis/auth";
import type { signUpSchema } from "@/schemas/signUpSchema";
import type { User } from "@/types/user";


const fetchAuth = {

    login: (data: sigInSchema) => apiService.postThrowable<sigInApiResponse>(apiRoutes.auth.login(), data),

    signUp: (data: signUpSchema) => apiService.postThrowable<signUpApiResponse>(apiRoutes.auth.signUp(), data),

    me: () => apiService.get<User>(apiRoutes.auth.me()),

    refresh: (refreshToken: string) => apiService.post<{ accessToken: string, refreshToken: string }>(apiRoutes.auth.refresh(), { refreshToken }),


} as const;

export default fetchAuth;