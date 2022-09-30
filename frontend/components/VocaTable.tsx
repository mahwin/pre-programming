import styled from "styled-components";

const TableWrapper = styled.div`
  height: 300px;
  position: relative;
  overflow: auto;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 300px;
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
    font-size: 18px;
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

export default function VocaTable() {
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
          <tr>
            <td>January</td>
            <td>$ 50,000.00</td>
          </tr>
          <tr>
            <td>February</td>
            <td>$ 10,000.00</td>
          </tr>
          <tr>
            <td>March</td>
            <td>$ 85,000.00</td>
          </tr>
          <tr>
            <td>April</td>
            <td>$ 56,000.00</td>
          </tr>
          <tr>
            <td>May</td>
            <td>$ 98,000.00</td>
          </tr>
          <tr>
            <td>January</td>
            <td>$ 50,000.00</td>
          </tr>
          <tr>
            <td>February</td>
            <td>$ 10,000.00</td>
          </tr>
          <tr>
            <td>March</td>
            <td>$ 85,000.00</td>
          </tr>
          <tr>
            <td>April</td>
            <td>$ 56,000.00</td>
          </tr>
          <tr>
            <td>May</td>
            <td>$ 98,000.00</td>
          </tr>
          <tr>
            <td>January</td>
            <td>$ 50,000.00</td>
          </tr>
          <tr>
            <td>February</td>
            <td>$ 10,000.00</td>
          </tr>
          <tr>
            <td>March</td>
            <td>$ 85,000.00</td>
          </tr>
          <tr>
            <td>April</td>
            <td>$ 56,000.00</td>
          </tr>
          <tr>
            <td>May</td>
            <td>$ 98,000.00</td>
          </tr>
        </tbody>
      </Table>
    </TableWrapper>
  );
}
