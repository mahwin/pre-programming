import { meanConvert } from "@utils/meanConvert";
import styled from "styled-components";
import { VocabularyItems } from "@type/commons/vocabulary";

interface Props {
  tableData: VocabularyItems;
}

export function ModalTable({ tableData }: Props) {
  return (
    <TableWrapper>
      <Table>
        <caption>선택한 단어 목록을 확인하는 표</caption>
        <thead>
          <tr>
            <th>word</th>
            <th>mean</th>
          </tr>
        </thead>

        <tbody>
          {tableData?.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.word}</td>
                <td>{meanConvert(item.mean, 2, 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  height: 300px;
  position: relative;
  overflow: auto;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 400px;
  table-layout: fixed;
  caption {
    display: none;
  }
  th {
    position: sticky;
    top: 0px;
    color: #d5dde5;
    background: #1b1e24;
    font-size: 20px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    padding: 12px 20px;
    text-align: left;
    vertical-align: middle;
  }
  td {
    background: #ffffff;
    padding: 10px 12px;
    text-align: left;
    vertical-align: middle;
    font-weight: ${(props) => props.theme.fontWeight.base};
    font-size: 14px;
  }
  tr td:first-child {
    border-right: 1px solid #c1c3d1;
  }
  tr td {
    border-bottom: 1px solid #c1c3d1;
  }
  tr:nth-child(odd) td {
    background: #ebebeb;
  }
  tr:nth-child(odd):hover td {
    background: #4e5066;
  }
  tr:hover td {
    background: #4e5066;
    color: #ffffff;
    border-top: 1px solid #22262e;
  }
`;
