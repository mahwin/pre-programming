import { CategoryItems } from "@type/commons/categories";
import { AxiosError } from "axios";

interface ICategoriesState {
  loading: boolean;
  data: CategoryItems | null;
  error: AxiosError | null;
}

const initialCategoriesState: ICategoriesState = {
  loading: false,
  data: null,
  error: null,
};

export { initialCategoriesState, type ICategoriesState };
