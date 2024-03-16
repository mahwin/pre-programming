import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  layout: string;
}

export function HStack({ children, layout }: Props) {
  return <Row layout={layout}>{children}</Row>;
}

const Row = styled.div<React.HTMLProps<HTMLDivElement> & { layout: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.layout};
`;
