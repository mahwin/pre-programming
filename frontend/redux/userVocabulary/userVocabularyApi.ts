import { authApi } from "@api/*";

async function getUserVocabulary() {
  try {
    const { data } = await authApi(`/user/vocabulary`);

    return data;
  } catch (error: any) {
    throw new Error("vocas를 가져오는데 실패했습니다.");
  }
}

export { getUserVocabulary };
