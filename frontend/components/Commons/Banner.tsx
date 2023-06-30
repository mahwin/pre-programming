import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getTrie from "@utils/getTrie";
import Trie from "@utils/trie";
import { IState } from "@redux/initialState";
import styled from "styled-components";
import { MagnifyingGlassSvg } from "@svg";

const Wapper = styled.section`
  position: relative;
  width: 100%;
  height: 390px;
  display: flex;
  justify-content: center;
`;

const BannerWapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  max-width: ${(props) => props.theme.windowSize.tablet};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;
const ContentWrapper = styled.div`
  margin-top: 80px;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BannerImg = styled.div`
  position: absolute;
  background-image: url("/banner.png");
  background-size: cover;
  width: 100%;
  height: 100%;
`;
const TitleBox = styled.header`
  width: 100%;
  display: flex;
  top: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  font-size: ${(props) => props.theme.fontSize.xxlg};
  letter-spacing: 0.2rem;
`;

const SubTitle = styled.h4`
  font-weight: ${(props) => props.theme.fontWeight.base};
  font-size: ${(props) => props.theme.fontSize.lg};
  letter-spacing: 0.1rem;
`;

const SearchBox = styled.section`
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

const Search = styled.input.attrs({
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

const Suggestion = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  background: slategray;
  padding: 0.8em 12px;
  border-radius: 5px;
  font-weight: 600;
  margin: 0;
  list-style-type: none;
`;

const UnSelectedItem = styled.li`
  margin-bottom: 0.8em;
  font-size: 1.1em;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SelectedItem = styled(UnSelectedItem)`
  background-color: orange;
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

export default function Banner() {
  const [keyword, setKeyword] = useState("");
  const [recommedObj, setRecommed] = useState<IRecommendObj>({
    recommends: [],
    selectedIndex: 0,
  });
  const [trie, setTrie] = useState<Trie | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  useEffect(() => {
    if (trie) {
      const recommends = trie.autoComplete(keyword, 10);
      setRecommed({ ...recommedObj, recommends });
    }
  }, [keyword]);

  const { loading, data, error } = useSelector((state: IState) => state.vocas);
  useEffect(() => {
    if (data !== null && trie === undefined) {
      setTrie(getTrie(data));
    }
  }, [data]);

  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLImageElement>) => {
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
          console.log(recommedObj.recommends[recommedObj.selectedIndex].word);
          setKeyword(recommedObj.recommends[recommedObj.selectedIndex].word);
          break;
      }
    }
  };

  return (
    <Wapper>
      <BannerImg role="img" aria-label="배경화면 입니다" />
      <BannerWapper>
        <ContentWrapper>
          <TitleBox>
            <Title>Pre-Programming</Title>
            <SubTitle>:What to do before you studying programming!</SubTitle>
          </TitleBox>
          <SearchBox onKeyUp={handleKeyboardEvent}>
            <InputBox>
              <MagnifyingGlassSvg width="24" height="24" color="green" />
              <Search onChange={handleChange} value={keyword} />
            </InputBox>
            {keyword && (
              <Suggestion>
                {recommedObj.recommends.length === 0 ? (
                  <UnSelectedItem key="empty">No results found</UnSelectedItem>
                ) : (
                  recommedObj.recommends.map((info, i) =>
                    recommedObj.selectedIndex === i ? (
                      <SelectedItem key={i}>{info.word}</SelectedItem>
                    ) : (
                      <UnSelectedItem key={i}>{info.word}</UnSelectedItem>
                    )
                  )
                )}
              </Suggestion>
            )}
          </SearchBox>
        </ContentWrapper>
      </BannerWapper>
    </Wapper>
  );
}
