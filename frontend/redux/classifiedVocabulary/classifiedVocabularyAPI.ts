import { api } from "@api/index";

async function getClassifiedVocabulary() {
  try {
    const { data } = await api.get("/vocabulary/classified");
    return data;
  } catch (error) {
    throw new Error("classified Vocabulary 데이터 조회 실패");
  }
}

export { getClassifiedVocabulary };
