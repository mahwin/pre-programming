import styled from "styled-components";
import Link from "next/link";
import { titleColor } from "assets/color/titleColors";
import { vocasColors } from "@color/vocasColors";
import { useSelector, useDispatch } from "react-redux";
import { ITitlesState } from "@type/commons/title";
import { titlesActions } from "@redux/titles/titlesSlice";
import { ObjectKeys } from "@utils/array";
import { isNil } from "@utils/typeGuard";
import { useEffect } from "react";
import { LoadingSvg } from "@svg";

export default function Vocas() {
  const { loading, data: titles } = useSelector(
    ({ titles }: { titles: ITitlesState }) => titles
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNil(titles)) return;
    dispatch(titlesActions.getTitles());
  }, [dispatch]);

  return (
    <Wrapper>
      {loading || !titles ? (
        <LodingContainer>
          <LoadingSvg width="120px" height="120px" />
        </LodingContainer>
      ) : (
        ObjectKeys(titles).map((devName, index) => (
          <Container key={index}>
            <header>
              <Title>for {devName}.dev</Title>
            </header>
            <ItemsWrapper>
              {titles[devName].map((item, itemIdx) => (
                <Link
                  href={`/vocas/${item.title.toLowerCase()}`}
                  key={item.title}
                >
                  <ItemBox
                    style={{ pointerEvents: item.ok ? "visible" : "none" }}
                  >
                    {!item.ok && (
                      <Overray>
                        <div>
                          <p>Upcoming</p>
                        </div>
                      </Overray>
                    )}
                    <Item>
                      <h3 style={{ color: titleColor[itemIdx % 9] }}>
                        {item.title}
                      </h3>
                      <p>단어 수 : {item.amount} </p>
                      <p>다운 수 : {item.install} </p>
                    </Item>
                  </ItemBox>
                </Link>
              ))}
            </ItemsWrapper>
          </Container>
        ))
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 580px;
`;

const LodingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.section<React.HTMLAttributes<HTMLElement>>`
  padding: 24px 0px 48px 0px;
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const ItemsWrapper = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Item = styled.article`
  padding: 20px;
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  p {
    font-size: 13px;
    color: ${vocasColors.testColor};
  }
`;

const ItemBox = styled.li<React.HTMLAttributes<HTMLAnchorElement>>`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: ${vocasColors.vocaBgColor};
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  /* for overlay */
  position: relative;
  overflow: hidden;
  :hover {
    transition: background-color 0.2s ease-in-out;
    background-color: ${vocasColors.vocaHoverBgColor};
  }
`;

const Overray = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    padding: 15px 10px;
    background-color: ${vocasColors.overlayTextColor};
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    p {
      font-size: ${(props) => props.theme.fontSize.base};
      font-weight: ${(props) => props.theme.fontWeight.base};
      color: white;
    }
  }
`;
