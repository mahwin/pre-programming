import axios from "axios";
import LocalStorage from "@utils/localStorage";

async function getUserVocas() {
  try {
    const token = LocalStorage.getItem("accessToken");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(
      `${process.env.API_HOST}:${process.env.PORT}/vocas/user`
    );

    return response;
  } catch (error: any) {
    new Error(error.message);
  }
}

export { getUserVocas };
