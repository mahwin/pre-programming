import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isNil } from "@utils/typeGuard";
import { IState } from "@redux/initialState";

import { vocabularyAction } from "@redux/vocabulary/vocabularySlice";

export function useVocabulary() {
  const { data, loading, error } = useSelector(
    (state: IState) => state.vocabulary
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNil(data)) return;

    dispatch(vocabularyAction.getVocabulary());
  }, [dispatch, data]);

  return { data, loading };
}
