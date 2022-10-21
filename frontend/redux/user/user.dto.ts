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

const initialUserState: IUserState = {
  loading: false,
  data: null,
  error: null,
};

export { initialUserState };
export type { IUser, IUserState };
