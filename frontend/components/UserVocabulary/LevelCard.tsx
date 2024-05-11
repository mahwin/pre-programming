import styled from "styled-components";
import { CheckSvg } from "@svg";
import { userVocaColors } from "@color/userVocaColor";
import { ICard } from "@type/userVoca";

const Card = styled.li<React.HTMLAttributes<HTMLElement>>`
  background-color: #fff;
  height: 80px;
  width: 125px;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  :hover {
    transition: all 0.2s ease-in-out;
  }
`;

const ClickedCard = styled(Card)<React.HTMLAttributes<HTMLElement>>`
  position: relative;
  box-shadow: 0 0 0 4px ${userVocaColors.selectedColor};
  span {
    opacity: 1;
    transition: all 1s ease-in-out;
  }
`;

const Title = styled.div`
  text-align: center;
  h3 {
    opacity: 0.7;
    color: ${(props) => props.theme.colorTheme.backgroundColor};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.base};
  }
`;

const Check = styled.span`
  position: absolute;
  top: -10px;
  right: -20px;
  height: 50px;
  width: 50px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 12px;
  justify-content: space-around;
  p {
    font-size: 18px;
    display: inline-block;
    color: #a875d5;
    font-weight: 500;
  }
  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3436;
  }
`;

export default function LevelCard({
  level,
  category,
  amount,
  isClick,
  onClickCard,
}: ICard) {
  return (
    <>
      {isClick ? (
        <ClickedCard id={category + "|" + level} onClick={onClickCard}>
          <Check>
            <CheckSvg
              width="30"
              height="30"
              color={userVocaColors.selectedColor}
            />
          </Check>
          <Title>
            <h3>level {level}</h3>
          </Title>
          <Row>
            <p>words</p>
            <h2>{amount}</h2>
          </Row>
        </ClickedCard>
      ) : (
        <Card id={category + "|" + level} onClick={onClickCard}>
          <Title>
            <h3>level {level}</h3>
          </Title>
          <Row>
            <p>words</p>
            <h2>{amount}</h2>
          </Row>
        </Card>
      )}
    </>
  );
}
