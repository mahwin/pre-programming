import styled from "styled-components";

import { RecommendObj } from "./index";

import { TableRow } from "./TableRow";

const TABLE_TITLES = ["word", "category", "mean"];

interface Props {
  recommedObj: RecommendObj;
  handleItemClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
}

export function Table({ recommedObj, handleItemClick }: Props) {
  return (
    <TableWrapper>
      <TableCaption>자동 완성 테이블</TableCaption>
      <TableHeader>
        <tr>
          {TABLE_TITLES.map((title) => (
            <th>{title}</th>
          ))}
        </tr>
      </TableHeader>
      <tbody>
        <TableRow {...{ recommedObj, handleItemClick }} />
      </tbody>
    </TableWrapper>
  );
}

const TableWrapper = styled.table`
  width: 574px;
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 5px;
  white-space: pre-wrap;
  background-color: ${(props) => props.theme.colorTheme.backgroundSecondary};

  & * > tr > :not(:last-child) {
    width: 120px;
    text-align: left;
  }

  td,
  th {
    padding-left: 1rem;
  }
`;

const TableHeader = styled.thead`
  font-weight: 700;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
  text-align: left;

  &::after {
    content: "";
    position: absolute;
    top: 40px;
    left: 10px;
    width: 550px;
    border: 0.5px solid ${(props) => props.theme.colorTheme.textPrimary};
  }
`;

const TableCaption = styled.caption`
  display: none;
`;
