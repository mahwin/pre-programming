import styled from "styled-components";
import Link from "next/link";
import { titleColor } from "assets/color/titleColors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 20px 10px;
`;

const Container = styled.div`
  padding: 10px;
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const ItemsWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  cursor: pointer;
`;

const ItemContents = styled.div`
  padding: 20px;
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  p {
    font-size: 13px;
    color: #e2e8f0;
  }
`;

const ItemBox = styled.a`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: rgba(56, 57, 68, 0.5);
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  cursor: pointer;
  /* for overlay */
  position: relative;
  overflow: hidden;
  :hover {
    transition: background-color 0.2s ease-in-out;
    background-color: rgba(63, 64, 75, 1);
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
    background-color: #4a5568;
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    p {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }
  }
`;

type DevCategoryType = "web";

type titleItemType = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

type titleType = {
  [key in DevCategoryType]: titleItemType[];
};

interface Ititle {
  data: titleType;
}

export default function Vocas({ data }: Ititle) {
  return (
    <Wrapper>
      {Object.keys(data).map((key) => (
        <Container key={key}>
          <Title>for {key}.dev</Title>
          <ItemsWrapper>
            {data[key as DevCategoryType].map(
              (item: titleItemType, idx: number) => (
                <Link
                  href={`/vocas/${item.title.toLowerCase()}`}
                  key={item.title}
                >
                  <ItemBox>
                    {!item.ok && (
                      <Overray>
                        <div>
                          <p>Upcoming</p>
                        </div>
                      </Overray>
                    )}
                    <ItemContents>
                      <h3 style={{ color: titleColor[idx % 9] }}>
                        {item.title}{" "}
                      </h3>
                      <p>단어 수 : {item.amount} </p>
                      <p>다운 수 : {item.install} </p>
                    </ItemContents>
                  </ItemBox>
                </Link>
              )
            )}
          </ItemsWrapper>
        </Container>
      ))}
    </Wrapper>
  );
}
