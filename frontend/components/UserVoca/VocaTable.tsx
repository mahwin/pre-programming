import { useEffect, useState } from "react";
import styled from "styled-components";
import FloatingBtn from "./FloatingBtn";
import { userVocaColors } from "assets/color/userVocaColor";
const Wrapper = styled.div`
  height: 100%;
  max-height: 70vh;
  width: ${(props) => props.theme.windowSize.tablet};
  overflow: auto;
  border-radius: 5px;
  margin-bottom: 100px;
  transition: all 1s ease-in-out;
`;

const Table = styled.table`
  table-layout: fixed;
  th {
    position: sticky;
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
    :nth-child(4) {
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
  const [totalWords, setTotalWords] = useState<IToTalWords[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  useEffect(() => {
    let words: IToTalWords[] = [];
    let amount = 0;
    Object.keys(clickedVoca).forEach((category: string) => {
      const levels = clickedVoca[category as categoriesType];
      if (levels!.length > 0) {
        levels?.forEach((level: string) => {
          amount += vocas.category[category].level[level].length;
          words = words.concat([
            { [category]: vocas.category[category].level[level] },
          ]);
        });
      }
    });
    setTotalAmount(amount);
    setTotalWords(words);
  }, [clickedVoca, vocas]);

  return (
    <>
      {totalWords?.length > 0 ? (
        <>
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
          </Wrapper>
          <FloatingBtn amount={totalAmount} data={totalWords} />
        </>
      ) : null}
    </>
  );
}
