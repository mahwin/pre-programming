import styled from "styled-components";

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
  color: #34495e;
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
    color: ${(props) => props.theme.colorTheme.textSecondary};
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

export default function Vocas() {
  return (
    <Wrapper>
      <Container>
        <Title>Web Front-end</Title>
        <Items>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
        </Items>
      </Container>
      <Container>
        <Title>Web Back-end</Title>
        <Items>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
        </Items>
      </Container>
      <Container>
        <Title>Web Front-end</Title>
        <Items>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
          <Item>HTML</Item>
        </Items>
      </Container>
    </Wrapper>
  );
}
