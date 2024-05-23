import { AxiosError } from "axios";

interface UserInfo {
  id: number;
  avatar: string;
  createdAt: string;
  name: string;
  phone: string;
  updatedAt: string;
}

interface IUserState {
  loading: boolean;
  data: UserInfo | null;
  error: AxiosError | null;
}

export type { UserInfo, IUserState };
