import { api } from "@api/index";

async function getCategories() {
  try {
    console.log("api");
    const response = await api.get("/categories/all");

    return response.data;
  } catch (error: any) {
    throw new Error("titles 데이터 조회 실패");
  }
}

export { getCategories };
