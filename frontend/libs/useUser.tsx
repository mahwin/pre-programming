import useSWR from "swr";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

const fetcher = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const response = await fetch(`${process.env.API_HOST}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
};

export default function useUser() {
  const { data, error } = useSWR("/api/user", fetcher);
  if (error) {
    return console.warn(error);
  }
  return data;
}
