import axios, { AxiosResponse } from "axios";

const baseApiOption = {
  baseURL: `${process.env.API_HOST}:${process.env.PORT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const throttlingApi = axios.create({ ...baseApiOption });

const requestSet = new Set();

const createRequestKey = (...arr: unknown[]) =>
  arr.reduce((acc, cur) => `${acc}&${cur}`);

throttlingApi.interceptors.request.use((config) => {
  const key = createRequestKey(config.url, config.method);

  if (requestSet.has(key)) {
    axios.CancelToken.source().cancel("중복 api 요청을 무시합니다.");
  } else {
    requestSet.add(key);
  }

  return config;
});

throttlingApi.interceptors.response.use((response: AxiosResponse) => {
  const { url, method } = response.config;
  const key = createRequestKey(url, method);
  requestSet.delete(key);
  return response;
});

export { throttlingApi };
