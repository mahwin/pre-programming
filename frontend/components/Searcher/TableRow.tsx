import type { ReactNode } from "react";

import type { RecommendObj } from "./";
import type { Voca } from "@type/commons/voca";
import { bannerColors } from "@color/bannerColors";

import styled from "styled-components";
import Link from "next/link";

import { FrownSvg, SendSvg } from "@svg";
import { HStack } from "@components/Commons/HStack";

import { meanConvert, camelStrToMiddleBarStr } from "@utils/index";

type FillTableRowProps = {
  handleItemClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  recommedObj: RecommendObj;
};

const isEmptyInfo = (recommends: Voca[]) => recommends.length === 0;

export function TableRow({
  handleItemClick,
  recommedObj: { recommends, selectedIndex },
}: FillTableRowProps) {
  if (isEmptyInfo(recommends)) {
    return (
      <tr>
        <td colSpan={3}>
          <EmptyTableRow>
            <span>No results found</span>
            <FrownSvg color="orange" width="30" height="30" strokeWidth="2" />
          </EmptyTableRow>
        </td>
      </tr>
    );
  }
  return (
    <>
      {recommends.map((info, i) => (
        <Row
          key={i}
          data-index={i}
          onClick={handleItemClick}
          isSelected={selectedIndex === i}
        >
          <td>{info.word}</td>
          <td>{info.category}</td>
          <td>
            <HStack layout="space-between">
              <span>{meanConvert(info.mean, 2, 15)}</span>
              <Route>
                <Link href={`/vocas/${camelStrToMiddleBarStr(info.category!)}`}>
                  <SendSvg width="24" height="24" />
                </Link>
              </Route>
            </HStack>
          </td>
        </Row>
      ))}
    </>
  );
}
const EmptyTableRow = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  span {
    font-size: ${(props) => props.theme.fontSize.md};
    font-weight: ${(props) => props.theme.fontWeight.xbold};
    margin-right: 10px;
  }
`;

const Route = styled.div`
  display: flex;
  background-color: transparent;
  &:hover svg {
    stroke: ${bannerColors.search.hoverColor};
    transform: scale(1.2);
    transition: all 0.5s ease-in;
    cursor: pointer;
  }
`;
const Row = styled.tr<{
  isSelected: boolean;
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
}>`
  &:hover {
    cursor: pointer;
    background-size: 100% 100%;
  }

  td {
    line-height: 40px;
    height: 40px;
  }

  td:last-child {
    padding-right: 1rem;
  }

  background-image: linear-gradient(
    transparent calc(100% - 5px),
    ${bannerColors.search.hoverColor} 2px
  );

  background-repeat: no-repeat;
  background-size: 0% 100%;
  transition: background-size 0.8s;

  background-color: ${(props) =>
    props.isSelected && bannerColors.search.selecetedColor};
`;
