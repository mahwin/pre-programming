import styled from "styled-components";
import { ITable } from "type/vocas";

const TableWapper = styled.table`
  color: #fff;
  overflow: hidden;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  th {
    display: none;
  }
  th,
  td {
    text-align: left;
  }
  td {
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    display: block;
    &:first-child {
      padding-top: 15px;
    }
    &:last-child {
      padding-bottom: 15px;
    }
    &:nth-child(1):before {
      content: "• 빈도수";
    }
    &:nth-child(2):before {
      content: "• 단어수";
    }
    &:nth-child(3):before {
      content: "• 총 단어수";
    }
    &:before {
      font-weight: bold;
      width: 6.5em;
      display: inline-block;
    }
  }
  th,
  td:before {
    color: #00b894;
  }
`;

export default function Table({ cardData, total }: ITable) {
  return (
    <TableWapper>
      <tbody>
        <tr>
          <th>빈도수</th>
          <th>단어 수</th>
          <th>총 단어수</th>
        </tr>
        <tr>
          <td>{cardData?.frequency}</td>
          <td>{cardData?.amount}</td>
          <td>{total}</td>
        </tr>
      </tbody>
    </TableWapper>
  );
}
