import axios, { AxiosError } from "axios";
import { authManager } from "@modules/Auth";
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

const baseApiOption = {
  baseURL: `${process.env.API_HOST}:${process.env.PORT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create({ ...baseApiOption });

const authApi = axios.create({ ...baseApiOption });

// 요청 인터셉터
authApi.interceptors.request.use(async (config) => {
  if (config.url === "/auth/refresh") return config;

  const token = authManager.get();

  if (!isNil(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
  throw { message: MESSAGE.ACCESSTOKEN_NOT_FOUND, config };
});

function checkNeedRefresh(error: ErrorResponse) {
  return (
    error?.message == MESSAGE.ACCESSTOKEN_NOT_FOUND ||
    error?.response?.data.message == MESSAGE.JWT_EXPIRED
  );
}

authApi.interceptors.response.use(undefined, async (error: ErrorResponse) => {
  if (checkNeedRefresh(error)) {
    const { accessToken } = await getAccessTokenByRefreshToken();

    if (isNil(accessToken)) return;
    authManager.set(accessToken);

    const originalRequest = error.config;
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
