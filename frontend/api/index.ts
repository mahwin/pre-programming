import axios, { AxiosError } from "axios";
import { throttlingApi } from "./throttlingApi";
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

authApi.interceptors.request.use(async (config) => {
  const token = authManager.get();

  if (isNil(token)) await genenateAccessToken();

  config.headers.Authorization = `Bearer ${authManager.get()}`;

  return config;
});

async function genenateAccessToken() {
  try {
    const { data } = await throttlingApi.get(apiRoutes.generateAccessToken);
    authManager.set(data.accessToken);
  } catch (error) {
    throw new Error("refresh 토큰 검증 실패");
  }
}

export { api, authApi, baseApiOption, AxiosError as ApiError };
