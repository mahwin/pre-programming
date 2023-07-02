import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import FloatingBtn from "./FloatingBtn";
import { userVocaColors } from "assets/color/userVocaColor";
import meanConvert from "@utils/meanConvert";
import { categoriesType } from "types/title";
import { IVoca, IVocas } from "@redux/vocas/vocas.dto";
import { IVocaTable, IToTalWords } from "types/userVoca";
const Wrapper = styled.section`
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
    top: 0;
    z-index: 5;
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

export default function VocaTable({ clickedVoca, vocas }: IVocaTable) {
  const [totalWords, setTotalWords] = useState<IToTalWords[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  useEffect(() => {
    let words: IToTalWords[] = [];
    let amount = 0;
    Object.keys(clickedVoca).forEach((clicked: string) => {
      const levels = clickedVoca[clicked as categoriesType];
      if (levels!.length > 0) {
        levels?.forEach((level: string) => {
          amount += vocas.category[clicked].level[level].length;
          words = words.concat([
            {
              [`${clicked}|${level}`]: vocas.category[clicked].level[level],
            },
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
                  const key = Object.keys(totalWord)[0];
                  const [category, level] = key.split("|");
                  return (
                    <Fragment key={category + level}>
                      {totalWord[key].map((item: IVoca, idx: number) => (
                        <tr key={idx}>
                          <td>{item.word}</td>
                          <td>{category}</td>
                          <td>{item.frequency}</td>
                          <td>{meanConvert(item.mean).join(" ")}</td>
                        </tr>
                      ))}
                    </Fragment>
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
