import { authApi } from "@api/index";

async function getUser() {
  try {
    const response = await authApi.get("/user");
    return response.data;
  } catch (error: any) {
    throw new Error("user 데이터 조회 실패");
  }
}

async function updateUser(data: any) {
  try {
    const response = await authApi.put(`/users/${data.id}`, data);
    return response;
  } catch (error) {
    throw new Error("user 정보 업데이트 실패");
  }
}

export { getUser, updateUser };
