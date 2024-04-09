import axios, { AxiosError } from "axios";
import { authManager } from "@utils/Auth";
import { isNil } from "@utils/typeGuard";

interface ErrorResponse {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
  config: {
    headers: {
      Authorization: string;
    };
  };
}

const api = axios.create({
  baseURL: `${process.env.API_HOST}:${process.env.PORT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = axios.create({
  baseURL: `${process.env.API_HOST}:${process.env.PORT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
authApi.interceptors.request.use((config) => {
  const token = authManager.get();
  if (!token) throw Error("토큰이 없어, 해당 요청을 서버로 보내지 않습니다.");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

authApi.interceptors.response.use(undefined, async (error: ErrorResponse) => {
  if (
    error.response?.status === 401 &&
    error.response?.data.message === "jwt expired"
  ) {
    const { accessToken } = await getAccessTokenByRefreshToken();
    if (isNil(accessToken)) return new Error("refresh 토큰 검증 실패");

    authManager.set(accessToken);
    // 재발급한 accessToken으로 다시 요청을 보냄

    const originalRequest = error.config;
    originalRequest.headers.Authorization = `Bearer ${authManager.get()}`;
    return authApi(originalRequest);
  }
});

async function getAccessTokenByRefreshToken() {
  try {
    const response = await authApi.get("/auth/refresh");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { api, authApi, AxiosError as ApiError };
