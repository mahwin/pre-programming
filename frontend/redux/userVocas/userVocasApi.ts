import { authApi } from "@api/*";

async function getUserVocas() {
  try {
    const response = await authApi(`/vocas/user`);

    return response;
  } catch (error: any) {
    throw new Error("vocas를 가져오는데 실패했습니다.");
  }
}

export { getUserVocas };
