import axios, { AxiosError } from "axios";

async function getVocas() {
  try {
    const response = await axios.get(`${process.env.API_HOST}/vocas/all`);
    return response;
  } catch (error: any) {
    new Error(error.message);
  }
}

export { getVocas };
