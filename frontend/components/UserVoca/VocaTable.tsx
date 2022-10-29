import { useEffect, useState } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  height: 500px;
  position: relative;
  overflow: auto;
  border-radius: 5px;
`;

const Table = styled.table`
  width: ${(props) => props.theme.windowSize.tablet};
  table-layout: fixed;
  th {
    position: sticky;
    top: 0px;
    color: #d5dde5;
    background: #1b1e24;
    font-size: 20px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    padding: 12px 20px;
    text-align: middle;
    vertical-align: middle;
    :nth-child(1) {
      width: 150px;
    }
    :nth-child(2) {
      width: 150px;
    }
    :nth-child(3) {
      width: 120px;
    }
    :nth-child(4) {
      width: 100%;
    }
  }
  td {
    background: #ffffff;
    padding: 10px 12px;
    text-align: center;
    vertical-align: middle;
    font-weight: ${(props) => props.theme.fontWeight.base};
    font-size: 14px;
    :nth-child(4) {
      text-align: left;
    }
  }

  tr td:nth-child(1),
  td:nth-child(2),
  td:nth-child(3) {
    border-right: 1px solid #c1c3d1;
  }

  tr td:nth-child(3) {
    text-align: center;
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
type categoriesType =
  | "next"
  | "react"
  | "reactHookForm"
  | "reactQuery"
  | "reactRedux"
  | "reactRouter"
  | "recoil"
  | "styledComponents"
  | "tailwindcss"
  | "axios";

interface IclickedVoca {
  next?: string[];
  react?: string[];
  reactHookForm?: string[];
  reactQuery?: string[];
  reactRedux?: string[];
  reactRouter?: string[];
  recoil?: string[];
  styledComponents?: string[];
  tailwindcss?: string[];
  axios?: string[];
}

interface IVocaTable {
  clickedVoca: IclickedVoca;
  vocas: any;
}

interface IWord {
  word: string;
  mean: string;
  frequency: string;
}
interface IToTalWords {
  [key: string]: IWord[];
}

export default function VocaTable({ clickedVoca, vocas }: IVocaTable) {
  const [totalWords, setTotalWords] = useState<IToTalWords[] | null>(null);
  useEffect(() => {
    let words: IToTalWords[] = [];
    Object.keys(clickedVoca).forEach((category: string) => {
      const levels = clickedVoca[category as categoriesType];
      if (levels!.length > 0) {
        levels?.forEach((level: string) => {
          words = words.concat([
            { [category]: vocas.category[category].level[level] },
          ]);
        });
      }
    });
    setTotalWords(words);
  }, [clickedVoca, vocas]);
  console.log(totalWords);
  return (
    <>
      {totalWords && (
        <TableWrapper>
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
              {totalWords.map((totalWord: IToTalWords) => {
                const [category, words] = Object.entries(totalWord)[0];
                return (
                  <>
                    {words.map((item: IWord, idx: number) => {
                      return (
                        <tr key={idx}>
                          <td>{item.word}</td>
                          <td>{category}</td>
                          <td>{item.frequency}</td>
                          <td>
                            {eval(item.mean)
                              .map(
                                (item: string, idx: number) =>
                                  idx + 1 + " ." + item
                              )
                              .join(" ")}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </>
  );
}
