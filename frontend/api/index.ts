import axios, { AxiosError } from "axios";
import { authManager } from "@utils/Auth";
import { isNil } from "@utils/typeGuard";

interface ErrorResponse {
  message?: string;
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

const MESSAGE = {
  JWT_EXPIRED: "jwt expired",
  ACCESSTOKEN_NOT_FOUND: "AccessToken이 없습니다.",
};

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
authApi.interceptors.request.use(async (config) => {
  if (config.url === "/auth/refresh") return config;

  const token = authManager.get();

  if (!isNil(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  throw Error(MESSAGE.ACCESSTOKEN_NOT_FOUND);
});

function checkNeedRefresh(error: ErrorResponse) {
  return (
    error?.message == MESSAGE.ACCESSTOKEN_NOT_FOUND ||
    error?.response?.data.message === MESSAGE.JWT_EXPIRED
  );
}

authApi.interceptors.response.use(undefined, async (error: ErrorResponse) => {
  if (checkNeedRefresh(error)) {
    const { accessToken } = await getAccessTokenByRefreshToken();

    if (isNil(accessToken)) return new Error("refresh 토큰 검증 실패");
    authManager.set(accessToken);

    const originalRequest = error.config;
    originalRequest.headers.Authorization = `Bearer ${authManager.get()}`;
    return authApi(originalRequest);
  }
});

async function getAccessTokenByRefreshToken() {
  try {
    const { data } = await authApi.get("/auth/refresh");
    return data;
  } catch (error) {
    throw new Error("refresh 토큰 검증 실패");
  }
}

export { api, authApi, AxiosError as ApiError };
