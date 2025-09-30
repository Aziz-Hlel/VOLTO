import type { sigInSchema } from "@/schemas/signInSchema";
import type { signUpSchema } from "@/schemas/signUpSchema";
import type { ApiResponse } from "@/Api/apiService";
import { jwtTokenManager } from "@/Api/JwtTokenManager.class";
import type { sigInApiResponse, signUpApiResponse } from "@/types/auth/auth";
import type { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import authService from "@/Api/services/auth.service";

type AuthState =
  | { status: "loading"; user: null }
  | { status: "authenticated"; user: User }
  | { status: "unauthenticated"; user: null };

type IAuthContext = {
  authState: AuthState;
  user: User | null;
  login: (data: sigInSchema) => Promise<ApiResponse<sigInApiResponse>>;
  register: (data: signUpSchema) => Promise<ApiResponse<signUpApiResponse>>;
  signup: (data: signUpSchema) => Promise<ApiResponse<signUpApiResponse>>;
  logout: () => void;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AUTH_QUERY_KEY = ["auth", "user"] as const;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: authData, isLoading } = useQuery<ApiResponse<User>>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authService.me,
    enabled: !!jwtTokenManager.getAccessToken(),
    // Remove initialData and select, handle mapping below
  });

  // Map the query result to AuthState
  const authState: AuthState = useMemo(() => {
    if (isLoading) {
      return { status: "loading", user: null };
    }
    if (authData?.success && authData.data) {
      return { status: "authenticated", user: authData.data };
    }
    return { status: "unauthenticated", user: null };
  }, [isLoading, authData]);

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: async (response) => {
      if (!response.success) return;
      jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
      await queryClient.setQueryData(AUTH_QUERY_KEY, response);
    },
  });

  const loginMuation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (response) => {
      if (!response.success) return;
      jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
      await queryClient.setQueryData(AUTH_QUERY_KEY, response);
    },
  });

  const register = useCallback(
    async (data: signUpSchema) => {
      try {
        const response = await signUpMutation.mutateAsync(data);
        return response;
      } catch (error) {
        return error as ApiResponse<signUpApiResponse>;
      }
    },
    [signUpMutation],
  );

  const login = useCallback(
    async (data: sigInSchema) => {
      try {
        const response = await loginMuation.mutateAsync(data);
        return response;
      } catch (error) {
        return error as ApiResponse<sigInApiResponse>;
      }
    },
    [loginMuation],
  );

  const logout = useCallback(() => {
    jwtTokenManager.clearTokens();
    queryClient.setQueryData(AUTH_QUERY_KEY, null);
  }, [queryClient]);

  const initializeAuth = useCallback(async () => {
    const refreshToken = jwtTokenManager.getRefreshToken();

    if (!refreshToken) {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      return;
    }

    const response = await authService.refresh(refreshToken);

    if (response.success) {
      jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
      await queryClient.refetchQueries({ queryKey: AUTH_QUERY_KEY });
    } else {
      jwtTokenManager.clearTokens();
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    }
  }, [queryClient]);

  useEffect(() => {
    const a = async () => {
      await initializeAuth();
    };
    a()
      .then(() => {})
      .catch(() => {});
  }, [initializeAuth]);

  const contextValue = useMemo<IAuthContext>(
    () => ({
      authState,
      user: authState.user,
      login,
      register,
      signup: register,
      logout,
    }),
    [login, register, logout, authState],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
