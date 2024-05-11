import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IState } from "@redux/initialState";
import { classifiedVocabularyActions } from "@redux/classifiedVocabulary/classifiedVocabularySlice";
import { isNil } from "@utils/typeGuard";

export function useClassifiedVocabulary() {
  const { data, loading } = useSelector(
    (state: IState) => state.classifiedVocabulary
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isNil(data))
      dispatch(classifiedVocabularyActions.getClassifiedVocabulary());
  }, [data, dispatch]);

  return { data, loading };
}
