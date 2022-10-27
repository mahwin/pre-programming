import { AxiosError } from "axios";

interface IlevelItem {
  [key: string]: null | string[];
}

interface IUserVocasState {
  loading: boolean;
  data: null | IlevelItem;
  error: null | AxiosError;
}

const initialUserVocasState: IUserVocasState = {
  loading: false,
  data: null,
  error: null,
};

export { initialUserVocasState };
export type { IUserVocasState };
