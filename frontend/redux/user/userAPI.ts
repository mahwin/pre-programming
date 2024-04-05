import { authApi } from "@api/index";

async function getUser() {
  try {
    const response = await authApi.get(`/user`);
    return response;
  } catch (error: any) {
    console.log(error);
    console.warn("user 데이터 받아오기 실패");
  }
}

async function updateUser(data: any) {
  try {
    const response = await authApi.put(`/users/${data.id}`, data);
  } catch (error) {
    console.warn(new Error("user 데이터 업데이트 실패"));
  }
}

export { getUser, updateUser };
