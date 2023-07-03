import { AxiosError } from "axios";

interface IUser {
  id: number;
  avatar: string;
  createdAt: string;
  name: string;
  phone: string;
  updatedAt: string;
}

interface IUserState {
  loading: boolean;
  data: IUser | null;
  error: AxiosError | null;
}

export type { IUser, IUserState };
