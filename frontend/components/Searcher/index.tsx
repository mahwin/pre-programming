import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Input } from "./Input";

import Trie from "@modules/Trie";

import { isNil } from "@utils/typeGuard";

import { IState } from "@redux/initialState";
import { vocasActions } from "@redux/vocas/vocasSlice";

import { Vocas } from "@type/commons/voca";
import { Table } from "./Table";

interface RecommendObj {
  recommends: Vocas;
  selectedIndex: number;
}

const MAX_ROCOMENDS = 8;

export function Searcher() {
  const [keyword, setKeyword] = useState("");
  const [recommedObj, setRecommed] = useState<RecommendObj>({
    recommends: [],
    selectedIndex: 0,
  });
  const [trie, setTrie] = useState<Trie | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }, []);

  useEffect(
    function autoComplete() {
      if (isNil(trie)) return;
      const recommends = trie.search(keyword);
      setRecommed({ selectedIndex: 0, recommends });
    },
    [keyword]
  );

  const { loading, data } = useSelector((state: IState) => state.vocas);

  const dispatch = useDispatch();

  useEffect(
    function getTrieInstance() {
      if (!isNil(trie)) return;

      if (isNil(data)) {
        dispatch(vocasActions.getVocas());
      } else {
        setTrie(Trie.getInstance(MAX_ROCOMENDS, data));
      }
    },
    [data, dispatch]
  );

  const handleKeyboardEvent = ({ key }: React.KeyboardEvent<HTMLElement>) => {
    const { recommends, selectedIndex } = recommedObj;

    if (recommends.length == 0) return;

    const lastIndex = recommends.length - 1;

    switch (key) {
      case "ArrowUp":
        setRecommed({
          ...recommedObj,
          selectedIndex:
            recommedObj.selectedIndex === 0
              ? lastIndex
              : recommedObj.selectedIndex - 1,
        });
        break;
      case "ArrowDown":
        setRecommed({
          ...recommedObj,
          selectedIndex:
            recommedObj.selectedIndex === lastIndex
              ? 0
              : recommedObj.selectedIndex + 1,
        });
        break;
      case "Enter":
        setKeyword(recommends[selectedIndex].word);
        break;
    }
  };

  const handleItemClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLElement>) => {
    const selectedIndex = Number(currentTarget.dataset.index);
    setRecommed({
      ...recommedObj,
      selectedIndex,
    });

    setKeyword(recommedObj.recommends[selectedIndex].word);
  };

  return (
    <Wrapper onKeyUp={handleKeyboardEvent}>
      <Input {...{ loading, keyword, handleChange, trie }} />
      {keyword && trie && <Table {...{ recommedObj, handleItemClick }} />}
    </Wrapper>
  );
}

const Wrapper = styled.section<React.HTMLAttributes<HTMLElement>>`
  margin-top: 30px;
  max-width: ${(props) => props.theme.windowSize.tablet};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  &:focus {
    border: 2px solid red;
  }
`;

export type { RecommendObj };
