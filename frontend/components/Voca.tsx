import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  color: ${(props) => props.theme.colorTheme.textSecondary};
`;

export default function Voca() {
  return (
    <Wrapper>
      <Container>
        <Title>Web Front-end</Title>
      </Container>
    </Wrapper>
  );
}
