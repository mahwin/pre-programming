import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IState } from "@redux/initialState";
import { classifiedVocabularyActions } from "@redux/classifiedVocabulary/classifiedVocabularySlice";
import { isNil } from "@utils/typeGuard";

export function useClassifiedVocabulary() {
  const { data, loading } = useSelector(
    ({ classifiedVocabulary }: IState) => classifiedVocabulary
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNil(data)) return;
    dispatch(classifiedVocabularyActions.getClassifiedVocabulary());
  }, [data, dispatch]);

  return { data, loading };
}
