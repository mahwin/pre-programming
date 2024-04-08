import { authApi } from "@api/*";

async function getUserVocas() {
  try {
    console.log(`/vocas/user`);
    const response = await authApi(`/vocas/user`);

    return response;
  } catch (error: any) {
    new Error(error.message);
  }
}

export { getUserVocas };
