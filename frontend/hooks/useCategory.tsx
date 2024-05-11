import { useSelector, useDispatch } from "react-redux";
import { IState } from "@redux/initialState";
import { useEffect } from "react";
import { categoriesActions } from "@redux/categories/categoriesSlice";
import { isNil } from "@utils/typeGuard";

export function useCategory() {
  const { data, loading } = useSelector(({ categories }: IState) => categories);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNil(data)) return;

    dispatch(categoriesActions.getCategories());
  }, [dispatch, data]);

  return { data, loading };
}
