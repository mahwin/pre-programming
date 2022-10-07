import axios, { AxiosError } from "axios";

async function getUser() {
  try {
    const response = await axios.get(`${process.env.API_HOST}/user`);
    return response;
  } catch (error: any) {
    new Error(error.message);
  }
}

async function updateUser(data: any) {
  try {
    const response = await axios.put(
      `${process.env.API_HOST}/users/${data.id}`,
      data
    );
  } catch (error) {
    console.warn(new Error("user 데이터 받아오기 실패"));
  }
}

export { getUser, updateUser };
