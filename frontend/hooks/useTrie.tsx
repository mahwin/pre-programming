import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IState } from "@redux/initialState";
import { vocabularyAction } from "@redux/vocabulary/vocabularySlice";
import { isNil } from "@utils/typeGuard";
import { Trie } from "@modules/Trie";

const MAX_ROCOMENDS = 8;

export function useTrie() {
  const { data, loading } = useSelector((state: IState) => state.vocabulary);
  const [trie, setTrie] = useState<Trie | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isNil(data)) {
      dispatch(vocabularyAction.getVocabulary());
      return;
    }
    if (isNil(trie)) {
      setTrie(Trie.getInstance(MAX_ROCOMENDS, data));
    }
  }, [data, dispatch]);

  return { trie, loading };
}
