import styled from "styled-components";
import { userVocaColors } from "@color/userVocaColor";
import { ClassifiedVocabularyItems } from "@type/commons/classifiedVocabulary";
import { meanConvert } from "@utils/index";

interface Props {
  spreadSelectedVocabulary: ClassifiedVocabularyItems;
}

export function VocaBularyTable({ spreadSelectedVocabulary }: Props) {
  if (spreadSelectedVocabulary.length === 0) return <></>;
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Mean</th>
          </tr>
        </thead>

        <tbody>
          {spreadSelectedVocabulary.map((vocaInfo, i) => (
            <tr key={i}>
              <td>{vocaInfo.word}</td>
              <td>{vocaInfo.category}</td>
              <td>{vocaInfo.frequency}</td>
              <td>{meanConvert(vocaInfo.mean, 3, 20)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 100%;
  width: ${(props) => props.theme.windowSize.tablet};
  border-radius: 5px;
  transition: all 1s ease-in-out;
  margin-bottom: 40px;
`;

const Table = styled.table`
  width: 100%;
  display: block;
  height: 500px;
  overflow: auto;

  thead {
    position: sticky;
    top: 0;
    z-index: 5;
  }

  th {
    color: ${userVocaColors.table.thColor};
    background: ${userVocaColors.table.thBgColor};
    font-size: 20px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    padding: 12px 20px;
  }
  td {
    background: #ffffff;
    padding: 10px 12px;
    text-align: center;
    vertical-align: middle;
    font-weight: ${(props) => props.theme.fontWeight.base};
    font-size: 14px;
    width: 200px;
    :nth-child(4) {
      width: 100%;
      text-align: left;
    }
  }

  tr td:nth-child(1),
  td:nth-child(2),
  td:nth-child(3) {
    border-right: 1px solid ${userVocaColors.table.tdLine};
  }

  tr td:nth-child(3) {
    text-align: center;
  }
  tr td {
    border-bottom: 1px solid ${userVocaColors.table.tdLine};
  }
  tr:nth-child(odd) td {
    opacity: 0.85;
  }
  tr:hover td {
    background: ${userVocaColors.table.trHover};
    color: #ffffff;
  }
`;
