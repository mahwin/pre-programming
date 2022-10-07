import styled from "styled-components";
import Link from "next/link";

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
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  cursor: pointer;
  div:nth-child(2n-1) {
    /* background-color: ${(props) =>
      props.theme.colorTheme.buttonSecondary}; */
    background-color: #1abc9c;
    color: ${(props) => props.theme.colorTheme.textThird};
  }
  div:nth-child(2n) {
    background-color: ${(props) => props.theme.colorTheme.buttonPrimary};
    color: #b2bec3;
  }
`;

const Item = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

export default function Vocas({ data }: any) {
  return (
    <Wrapper>
      {Object.keys(data).map((key) => (
        <Container key={key}>
          <Title>{key}</Title>
          <Items>
            {data[key].map((item: string) => (
              <Link href={`/${item}`} key={item}>
                <Item>{item}</Item>
              </Link>
            ))}
          </Items>
        </Container>
      ))}
    </Wrapper>
  );
}
