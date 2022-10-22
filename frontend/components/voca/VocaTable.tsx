import { useEffect } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  height: 300px;
  position: relative;
  overflow: auto;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 400px;
  table-layout: fixed;
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

interface ITableVoca {
  word: string;
  mean: string;
  frequency: string;
}

export default function VocaTable({ voca }: any) {
  console.log(voca);
  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>word</th>
            <th>mean</th>
          </tr>
        </thead>

        <tbody>
          {voca?.map((item: ITableVoca, idx: number) => {
            return (
              <tr key={idx}>
                <td>{item.word}</td>
                <td>
                  {eval(item.mean)
                    .map((item: string, idx: number) => idx + 1 + " ." + item)
                    .join(" ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
