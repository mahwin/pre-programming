import styled from "styled-components";
import { CheckSvg } from "@svg";

const Card = styled.li`
  position: relative;
  margin: 0 auto;
  background-color: #fff;
  height: 80px;
  width: 125px;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

const ClickedCard = styled.li`
  position: relative;
  margin: 0 auto;
  background-color: #fff;
  height: 80px;
  width: 125px;
  border-radius: 3px;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0 0 0 4px rgb(0, 184, 148);
  span {
    opacity: 1;
    transition: all 1s ease-in-out;
  }
`;

const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  h3 {
    color: #636e72;
    font-weight: 400;
    font-size: 16px;
  }
`;

const CheckBox = styled.span`
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
    color: #8a81bd;
    font-weight: 500;
  }
  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3436;
  }
`;

interface ICard {
  level: string;
  category: string;
  amount: number;
  isClick: boolean | undefined;
  onClickCard: (e: any) => void;
}

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
          <CheckBox>
            <CheckSvg width="30" height="30" color="rgb(0, 184, 148)" />
          </CheckBox>
          <Center>
            <h3>level {level}</h3>
          </Center>
          <Row>
            <p>words</p>
            <h2>{amount}</h2>
          </Row>
        </ClickedCard>
      ) : (
        <Card id={category + "|" + level} onClick={onClickCard}>
          <Center>
            <h3>level {level}</h3>
          </Center>
          <Row>
            <p>words</p>
            <h2>{amount}</h2>
          </Row>
        </Card>
      )}
    </>
  );
}
