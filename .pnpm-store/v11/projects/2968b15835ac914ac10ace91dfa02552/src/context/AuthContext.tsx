import type { sigInSchema } from "@/schemas/signInSchema";
import type { signUpSchema } from "@/schemas/signUpSchema";
import type { ApiResponse } from "@/Api/apiService";
import { jwtTokenManager } from "@/Api/JwtTokenManager.class";
import type { sigInApiResponse, signUpApiResponse } from "@/types/auth/auth";
import type { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useCallback, useContext, useMemo } from "react";
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
    queryFn: async () => {
      const accessToken = jwtTokenManager.getAccessToken();
      const refreshToken = jwtTokenManager.getRefreshToken();

      // No tokens at all - user is not authenticated
      if (!accessToken && !refreshToken) {
        throw new Error("No authentication tokens");
      }

      // Try to fetch user with access token
      if (accessToken) {
        try {
          const response = await authService.me();
          if (response.success) {
            return response;
          }
        } catch (error) {
          // Access token failed, will try refresh below
          console.warn("Access token invalid, attempting refresh");
        }
      }

      // Access token missing or invalid - try refresh token
      if (refreshToken) {
        const refreshResponse = await authService.refresh(refreshToken);

        if (refreshResponse.success) {
          jwtTokenManager.setTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken,
          );
          // Fetch user data with new token
          return await authService.me();
        }
      }

      // Both tokens failed
      jwtTokenManager.clearTokens();
      throw new Error("Authentication failed");
    },
    enabled: !!jwtTokenManager.getAccessToken() || !!jwtTokenManager.getRefreshToken(),
    retry: false, // Don't retry failed auth requests
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
  });

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
    onSuccess: (response) => {
      if (!response.success) return;
      jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
      queryClient.setQueryData(AUTH_QUERY_KEY, response);
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      if (!response.success) return;
      jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
      queryClient.setQueryData(AUTH_QUERY_KEY, response);
    },
  });

  const register = useCallback(
    async (data: signUpSchema) => {
      try {
        return await signUpMutation.mutateAsync(data);
      } catch (error) {
        return error as ApiResponse<signUpApiResponse>;
      }
    },
    [signUpMutation],
  );

  const login = useCallback(
    async (data: sigInSchema) => {
      try {
        return await loginMutation.mutateAsync(data);
      } catch (error) {
        return error as ApiResponse<sigInApiResponse>;
      }
    },
    [loginMutation],
  );

  const logout = useCallback(() => {
    jwtTokenManager.clearTokens();
    queryClient.setQueryData(AUTH_QUERY_KEY, null);
    queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
  }, [queryClient]);

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
