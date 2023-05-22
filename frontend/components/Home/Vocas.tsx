import styled from "styled-components";
import Link from "next/link";

const colors = [
  "#ED7D7F",
  "#FEFCBF",
  "#9AE6B4",
  "#81E6D9",
  "#90CDF4",
  "#FEB2B2",
  "#E2E8F0",
  "#81E6D9",
  "#9AE6B4",
  "#ffeaa7",
];

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
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

const Items = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  cursor: pointer;
  :nth-child(1):nth-child(9n) {
    background-color: ${colors[0]};
  }
`;

const Item = styled.a`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: rgba(56, 57, 68, 0.5);
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  overflow: hidden;
  cursor: pointer;
  :hover {
    transition: background-color 0.2s ease-in-out;
    background-color: rgba(63, 64, 75, 1);
  }
`;

const ItemBox = styled.div`
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

type titleType = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

interface Ititle {
  data: titleType[];
}

const typeKeys = ["title"];

// const ttt =   { title: string; ok: boolean; amount: string; install: string }[];

export default function Vocas({ data }: Ititle) {
  console.log(data.map((el) => console.log(el)));
  return (
    <Wrapper>
      <Container key="Web">
        <Title>for web.dev</Title>
        <Items>
          {data.map((item: titleType, idx) => (
            <Link href={`/vocas/${item.title.toLowerCase()}`} key={item.title}>
              <Item>
                {!item.ok && (
                  <Overray>
                    <div>
                      <p>Upcoming</p>
                    </div>
                  </Overray>
                )}
                <ItemBox>
                  <h3 style={{ color: colors[idx % 9] }}>{item.title} </h3>
                  <p>단어 수 : {item.amount} </p>
                  <p>다운 수 : {item.install} </p>
                </ItemBox>
              </Item>
            </Link>
          ))}
        </Items>
      </Container>
    </Wrapper>
  );
}
