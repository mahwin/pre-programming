import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Trie from "@utils/trie";
import { IState } from "@redux/initialState";
import styled from "styled-components";
import { MagnifyingGlassSvg, FrownSvg, SendSvg } from "@svg";
import { camelStrToMiddleBarStr } from "@utils/camelCaser";
import { useRouter } from "next/router";
import Link from "next/link";
import { vocasActions } from "@redux/vocas/vocasSlice";
import meanConvert from "@utils/meanConvert";
import { bannerColors } from "@color/bannerColors";
import LocalStorage from "@utils/localStorage";

const Wrapper = styled.section`
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
  placeholder: "단어를 입력하세요",
})`
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

const Suggestion = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 600px;
  list-style-type: none;
  padding: 1em 2em;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colorTheme.backgroundSecondary};
`;

const EmptySuggestion = styled(Suggestion)`
  width: 100%;
  display: flex;
  align-items: center;
  span {
    font-size: ${(props) => props.theme.fontSize.md};
    font-weight: ${(props) => props.theme.fontWeight.xbold};
    margin-right: 10px;
  }
`;

const Ul = styled.ul<{ isSelected?: boolean }>`
  background-color: ${(props) =>
    props.isSelected && bannerColors.search.selecetedColor};
  margin: 0;
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
  background-image: linear-gradient(
    transparent calc(100% - 5px),
    ${bannerColors.search.hoverColor} 5px
  );
  background-repeat: no-repeat;
  background-size: 0% 100%;
  transition: background-size 0.8s;
  :nth-child(1) {
    padding-bottom: 1rem;
    border-bottom: 2px solid
      ${(props) => props.theme.colorTheme.backgroundColor};
  }
  &:not(:nth-child(1)):hover {
    background-size: 100% 100%;
  }
`;

const Li = styled.li`
  white-space: pre-wrap;
  margin: 0;
  padding: 0;
  font-size: 1.1em;
  width: 30%;
  &:last-of-type {
    flex-grow: 2;
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
`;

interface IInfo {
  frequency: string;
  word: string;
  category?: string;
  level?: string;
  mean: string;
}

interface IRecommendObj {
  recommends: IInfo[];
  selectedIndex: number;
}

type titleType = keyof IInfo;

export default function Search() {
  const [isDark, setIsDark] = useState(true);
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
    setIsDark(LocalStorage.getItem("isDark") == "1" ? false : true);
  }, [LocalStorage.getItem("isDark")]);

  useEffect(() => {
    if (trie) {
      const recommends = trie.autoComplete(keyword, 10);
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
    setRecommed({
      ...recommedObj,
      selectedIndex: Number(e.currentTarget.dataset.index),
    });
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
        <>
          {recommedObj.recommends.length === 0 ? (
            <EmptySuggestion>
              <span>No results found</span>
              <FrownSvg color="orange" width="30" height="30" strokeWidth="2" />
            </EmptySuggestion>
          ) : (
            <Suggestion>
              <Ul key="title">
                {titles.map((title) => (
                  <Li key={title}>{title}</Li>
                ))}
              </Ul>
              {recommedObj.recommends.map((info, i) => (
                <Ul
                  onClick={handleItemClick}
                  key={i}
                  data-index={i}
                  isSelected={recommedObj.selectedIndex === i ? true : false}
                >
                  {titles.map((title) => {
                    switch (title) {
                      case "mean":
                        return (
                          <Li key={title + i}>
                            {meanConvert(info[title], 2, 15).join("\n")}
                          </Li>
                        );
                      case "category":
                        return (
                          <Li key={title + i}>
                            {camelStrToMiddleBarStr(info[title]!)}
                          </Li>
                        );
                      default:
                        return <Li key={title + i}>{info[title]!}</Li>;
                    }
                  })}
                  <Route>
                    <Link
                      href={`/vocas/${camelStrToMiddleBarStr(info.category!)}`}
                    >
                      <a>
                        <SendSvg width="24" height="24" />
                      </a>
                    </Link>
                  </Route>
                </Ul>
              ))}
            </Suggestion>
          )}
        </>
      )}
    </Wrapper>
  );
}
