import { authApi } from "@api/*";

async function getUserVocabulary() {
  try {
    const { data } = await authApi.get(`/user/vocabulary`);
    return data;
  } catch (error: any) {
    throw new Error("user vocabulary를 가져오는데 실패했습니다.");
  }
}

export { getUserVocabulary };
