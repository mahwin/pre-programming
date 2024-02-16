import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export function VStack({ children }: Props) {
  return <Column>{children}</Column>;
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
