import { AxiosError } from "axios";

interface IUser {
  avatar: string;
  createdAt: string;
  id: string;
  name: string;
  phone: string;
  updatedAt: string;
}

interface UserState {
  loading: boolean;
  data: IUser | null;
  error: AxiosError | null;
}

export type { IUser };
export default UserState;
