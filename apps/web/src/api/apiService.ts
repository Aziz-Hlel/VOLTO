import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import ENV from "@/config/ENV";

// TODO : hedhi 9assmha l zouz types w7da b success fasle w w7da b success true bch kek keni false rahou data type undefined mouch T, for more type safety

export interface ApiSuccessResponse<T> {
  success: true;
  status: number;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  status: number;
  error: string | unknown;
}


export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;


const creatAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: ENV.BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

class ApiService {

  private axiosInstance: AxiosInstance;


  constructor() {
    this.axiosInstance = creatAxiosInstance();
  }



  private throwErrorAlert = (statusCode: number, error: string) => {
    alert(`Request failed with status ${statusCode} - error message: ${error}`);
  };


  handleApiSuccess<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return { data: response.data, status: response.status, success: true };
  }

  handleApiError(error: unknown): ApiErrorResponse {

    let apiErrorMessage = "Request failed";
    let status: number | undefined = undefined;

    if (typeof error === "object" && error !== null) {
      const err = error as { response?: AxiosResponse<{ error?: string }>; message?: string };
      apiErrorMessage = err.response?.data?.error || err.message || "Request failed";
      status = err.response?.status;
    } else if (typeof error === "string") {
      apiErrorMessage = error;
    }

    if (status !== 200) this.throwErrorAlert(status ?? 0, apiErrorMessage);

    return { error: apiErrorMessage, status : status ?? 0 , success: false };
  }

  // Wrapper methods with error handling
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      return this.handleApiError(error);
    }
  }

  async getThrowable<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      throw this.handleApiError(error);
    }
  }

  async post<T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      return this.handleApiError(error);
    }
  }

  async postThrowable<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      throw this.handleApiError(error);
    }
  }

  async put<T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      return this.handleApiError(error);
    }
  }

  async putThrowable<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      throw this.handleApiError(error);
    }
  }

  async patch<T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      return this.handleApiError(error);
    }
  }

  async patchThrowable<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      throw this.handleApiError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      return this.handleApiError(error);
    }
  }

  async deleteThrowable<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return this.handleApiSuccess(response);
    } catch (error: unknown) {
      throw this.handleApiError(error);
    }
  }
}

export const apiService = new ApiService();
