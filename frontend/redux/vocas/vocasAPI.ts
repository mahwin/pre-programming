import { api } from "@api/index";

async function getVocas() {
  try {
    const response = await api.get(`/vocas/all`);
    return response;
  } catch (error: any) {
    new Error(error.message);
  }
}

export { getVocas };
