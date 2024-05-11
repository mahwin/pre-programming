import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IState } from "@redux/initialState";
import { vocasActions } from "@redux/vocabulary/vocabularySlice";
import { isNil } from "@utils/typeGuard";

export function useGetVocabulary() {
  const { data, loading } = useSelector((state: IState) => state.vocabulary);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isNil(data)) dispatch(vocasActions.getVocabulary());
  }, [data, dispatch]);

  return { data, loading };
}
