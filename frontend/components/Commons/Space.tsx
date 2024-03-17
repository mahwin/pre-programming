import styled from "styled-components";

export function Space({ as = "div" }) {
  return <Wrapper as={as} />;
}

const Wrapper = styled.div`
  flex-grow: 1;
`;
