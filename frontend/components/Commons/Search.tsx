import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Trie from "@modules/Trie";
import { IState } from "@redux/initialState";
import styled from "styled-components";
import { MagnifyingGlassSvg, FrownSvg, SendSvg } from "@svg";
import { camelStrToMiddleBarStr } from "@utils/camelCaser";
import { useRouter } from "next/router";
import Link from "next/link";
import { vocasActions } from "@redux/vocas/vocasSlice";
import meanConvert from "@utils/meanConvert";
import { bannerColors } from "@color/bannerColors";
import { IVoca } from "@type/commons/voca";

import { HStack } from "@components/Commons/HStack";

interface IRecommendObj {
  recommends: IVoca[];
  selectedIndex: number;
}

type titleType = keyof IVoca;

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [recommedObj, setRecommed] = useState<IRecommendObj>({
    recommends: [],
    selectedIndex: 0,
  });
  const [trie, setTrie] = useState<Trie | undefined>();
  const [titles, _] = useState<titleType[]>(["word", "category", "mean"]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  useEffect(() => {
    if (trie) {
      const recommends = trie.autoComplete(keyword, 8);
      setRecommed({ selectedIndex: 0, recommends });
    }
  }, [keyword]);

  const { loading, data, error } = useSelector((state: IState) => state.vocas);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(vocasActions.getVocas());
    } else if (trie === undefined) {
      setTrie(Trie.getInstance(data));
    }
  }, [data, dispatch]);

  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLElement>) => {
    if (recommedObj.recommends.length == 0) return;
    const activateKey = ["ArrowUp", "ArrowDown", "Enter"];
    const lastIndex = recommedObj.recommends.length - 1;
    if (activateKey.includes(e.key)) {
      switch (e.key) {
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
          setKeyword(recommedObj.recommends[recommedObj.selectedIndex].word);
          break;
      }
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const selectedIndex = Number(e.currentTarget.dataset.index);
    setRecommed({
      ...recommedObj,
      selectedIndex,
    });

    setKeyword(recommedObj.recommends[selectedIndex].word);
  };

  const router = useRouter();
  useEffect(() => {
    setKeyword("");
    setRecommed({
      recommends: [],
      selectedIndex: 0,
    });
  }, [router]);

  return (
    <Wrapper onKeyUp={handleKeyboardEvent}>
      <InputBox>
        <MagnifyingGlassSvg width="24" height="24" color="green" />
        {!loading ? (
          <Input onChange={handleChange} value={keyword} />
        ) : (
          <LodingInput>
            <FrownSvg color="gray" width="30" height="30" strokeWidth="2" />
          </LodingInput>
        )}
      </InputBox>
      {keyword && trie && (
        <SuggestionTable>
          <SuggestionHeader>
            <TableRow>
              {titles.map((title, i) => (
                <th>{title}</th>
              ))}
            </TableRow>
          </SuggestionHeader>
          {recommedObj.recommends.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <EmptySuggestion>
                  <span>No results found</span>
                  <FrownSvg
                    color="orange"
                    width="30"
                    height="30"
                    strokeWidth="2"
                  />
                </EmptySuggestion>
              </td>
            </tr>
          ) : (
            recommedObj.recommends.map((info, i) => (
              <TableRow
                key={i}
                data-index={i}
                onClick={handleItemClick}
                isSelected={recommedObj.selectedIndex === i ? true : false}
              >
                <td>{info.word}</td>
                <td>{info.category}</td>
                <td>
                  <HStack layout="space-between">
                    <span>{meanConvert(info.mean, 2, 15)}</span>
                    <Route>
                      <Link
                        href={`/vocas/${camelStrToMiddleBarStr(
                          info.category!
                        )}`}
                      >
                        <a>
                          <SendSvg width="24" height="24" />
                        </a>
                      </Link>
                    </Route>
                  </HStack>
                </td>
              </TableRow>
            ))
          )}
        </SuggestionTable>
      )}
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

const InputBox = styled.div`
  border-radius: 5px;
  overflow: hidden;
  height: 40px;
  width: 400px;
  display: flex;
  padding: 20px 5px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
`;

const Input = styled.input.attrs({
  tpye: "text",
  spellCheck: "false",
  placeholder: "단어를 입력하세요",
})<React.HTMLAttributes<HTMLInputElement> & { value: string }>`
  padding: 10px;
  height: 36px;
  width: 100%;
  border: none;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colorTheme.textPrimary};
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.activePrimary};
  }
`;

const LodingInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
`;

const EmptySuggestion = styled.div`
  display: flex;
  height: 60px;
  width: 200px;
  align-items: center;
  padding-left: 10px;

  span {
    font-size: ${(props) => props.theme.fontSize.md};
    font-weight: ${(props) => props.theme.fontWeight.xbold};
    margin-right: 10px;
  }
`;

const Route = styled.div`
  display: flex;
  background-color: transparent;
  &:hover svg {
    stroke: ${bannerColors.search.hoverColor};
    transform: scale(1.2);
    transition: all 0.5s ease-in;
    cursor: pointer;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
  }
`;

const SuggestionTable = styled.table`
  width: 574px;
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 5px;
  white-space: pre-wrap;
  background-color: ${(props) => props.theme.colorTheme.backgroundSecondary};
`;

const SuggestionHeader = styled.thead`
  font-weight: 700;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
  text-align: left;
`;

const TableRow = styled.tr<
  React.HTMLAttributes<HTMLTableElement> & { isSelected?: boolean }
>`
  :hover {
    cursor: pointer;
  }

  &:not(:nth-child(1)):hover {
    background-size: 100% 100%;
  }

  :nth-child(1)::after {
    content: "";
    position: absolute;
    top: 40px;
    left: 10px;
    width: 550px;
    border: 0.5px solid ${(props) => props.theme.colorTheme.textPrimary};
  }

  & {
    th:nth-child(1),
    td:nth-child(1) {
      width: 120px;
    }
  }

  & {
    th:nth-child(2),
    td:nth-child(2) {
      width: 120px;
    }
  }

  & {
    th:nth-child(3),
    td:nth-child(3) {
      width: 332px;
    }
  }

  td,
  th {
    padding-left: 10px;
  }

  td {
    line-height: 40px;
    height: 40px;
  }

  td:nth-child(3) {
    padding-right: 5px;
  }

  background-image: linear-gradient(
    transparent calc(100% - 5px),
    ${bannerColors.search.hoverColor} 2px
  );

  background-repeat: no-repeat;
  background-size: 0% 100%;
  transition: background-size 0.8s;
  :nth-child(2) {
    padding-bottom: 0.2rem;
    border-bottom: 1px solid
      ${(props) => props.theme.colorTheme.backgroundSecondary};
  }

  background-color: ${(props) =>
    props.isSelected && bannerColors.search.selecetedColor};
`;
