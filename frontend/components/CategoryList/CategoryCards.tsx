import Link from "next/link";
import styled from "styled-components";
import { CategoryItems } from "@type/commons/categories";

import { titleColor } from "assets/color/titleColors";
import { vocasColors } from "@color/vocasColors";
import { HTMLAttributes } from "react";

interface Props {
  categories: CategoryItems;
}

export function CategoryCards({ categories }: Props) {
  return (
    <CardsWrapper>
      {categories.map((categoryInfo, index) =>
        categoryInfo.available ? (
          <CardBox key={index} style={{ cursor: "pointer" }}>
            <Link href={`/category/${categoryInfo.category.toLowerCase()}`}>
              <Card>
                <h3 style={{ color: titleColor[index % 9] }}>
                  {categoryInfo.category}
                </h3>
                <p>단어 수 : {categoryInfo.amount} </p>
                <p>다운 수 : {categoryInfo.install} </p>
              </Card>
            </Link>
          </CardBox>
        ) : (
          <CardBox
            style={{
              cursor: "not-allowed",
            }}
            key={index}
          >
            <Overray>
              <div>
                <p>준비중</p>
              </div>
            </Overray>
            <Card>
              <h3 style={{ color: titleColor[index % 9] }}>
                {categoryInfo.category}
              </h3>
              <p>단어 수 : Not Yet </p>
              <p>다운 수 : Not Yet </p>
            </Card>
          </CardBox>
        )
      )}
    </CardsWrapper>
  );
}

const CardsWrapper = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const CardBox = styled.li<HTMLAttributes<HTMLElement>>`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: ${vocasColors.vocaBgColor};
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  /* for overlay */
  position: relative;
  overflow: hidden;
  :hover {
    transition: background-color 0.2s ease-in-out;
    background-color: ${vocasColors.vocaHoverBgColor};
  }
`;

const Overray = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    padding: 15px 10px;
    background-color: ${vocasColors.overlayTextColor};
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    p {
      font-size: ${(props) => props.theme.fontSize.base};
      font-weight: ${(props) => props.theme.fontWeight.base};
      color: white;
    }
  }
`;

const Card = styled.article`
  padding: 20px;
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  p {
    font-size: 13px;
    color: ${vocasColors.testColor};
  }
`;
