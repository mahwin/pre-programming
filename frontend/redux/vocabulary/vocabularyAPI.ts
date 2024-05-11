import { api } from "@api/index";

async function getVocabulary() {
  try {
    const { data } = await api.get(`/vocabulary/all`);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      new Error(error.message);
    }
  }
}

export { getVocabulary };
