import axios, { AxiosError } from "axios";
import { authManager } from "@modules/Auth";
import { isNil } from "@utils/typeGuard";
import { apiRoutes } from "../apiRouters";

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
  const token = authManager.get();

  if (!isNil(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
  await genenateAccessToken();

  return config;
});

async function genenateAccessToken() {
  try {
    const { data } = await api.get(apiRoutes.generateAccessToken);
    authManager.set(data.accessToken);
  } catch (error) {
    throw new Error("refresh 토큰 검증 실패");
  }
}

export { api, authApi, AxiosError as ApiError };
