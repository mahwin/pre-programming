import styled from "styled-components";
import Link from "next/link";
import { titleColor } from "assets/color/titleColors";
import { vocasColors } from "@color/vocasColors";
import { useSelector } from "react-redux";
import { IState } from "@redux/initialState";
import { ITitles, titleItemType, devCategoryType } from "types/title";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 20px 10px;
`;

const Container = styled.section`
  padding: 10px;
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const ItemsWrapper = styled.section`
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

const ItemBox = styled.a`
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

//
export default function Vocas({ data }: ITitles) {
  useSelector((state: IState) => state.vocas);
  return (
    <Wrapper>
      {Object.keys(data).map((key) => (
        <Container key={key}>
          <header>
            <Title>for {key}.dev</Title>
          </header>
          <ItemsWrapper>
            {data[key].map((item: titleItemType, idx: number) => (
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
                    <h3 style={{ color: titleColor[idx % 9] }}>
                      {item.title}{" "}
                    </h3>
                    <p>단어 수 : {item.amount} </p>
                    <p>다운 수 : {item.install} </p>
                  </Item>
                </ItemBox>
              </Link>
            ))}
          </ItemsWrapper>
        </Container>
      ))}
    </Wrapper>
  );
}
