import axios from "axios";

async function getVocas() {
  try {
    const response = await axios.get(`${process.env.API_HOST}/vocas`);
  } catch (error) {
    console.warn(new Error("vocas 데이터 받아오기 실패"));
  }
}

export { getVocas };
