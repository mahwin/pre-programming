import { api } from "@api/index";

async function getTitles() {
  try {
    const response = await api.get("/title/all");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error("titles 데이터 조회 실패");
  }
}

export { getTitles };
