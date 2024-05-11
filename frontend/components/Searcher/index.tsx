import React, { useEffect, useState, useCallback } from "react";

import styled from "styled-components";

import { Input } from "./Input";
import { Table } from "./Table";

import { useTrie } from "@hooks/useTrie";
import { isNil } from "@utils/typeGuard";

import { VocabularyItem } from "@type/commons/vocabulary";

interface RecommendObj {
  recommends: VocabularyItem[];
  selectedIndex: number;
}

export function Searcher() {
  const [keyword, setKeyword] = useState("");
  const [recommedObj, setRecommed] = useState<RecommendObj>({
    recommends: [],
    selectedIndex: 0,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }, []);

  const { trie, loading } = useTrie();

  useEffect(
    function autoComplete() {
      if (isNil(trie)) return;
      const recommends = trie.search(keyword);
      setRecommed({ selectedIndex: 0, recommends });
    },
    [keyword]
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
