import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isNil } from "@utils/typeGuard";
import { IState } from "@redux/initialState";

import { userVocabularyActions } from "@redux/userVocabulary/userVocabularySlice";

export function useUserVocabulary() {
  const { data, loading, error } = useSelector(
    (state: IState) => state.userVocabulary
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNil(data)) return;

    dispatch(userVocabularyActions.getUserVocabulary());
  }, [dispatch, data]);

  return { data, loading };
}
