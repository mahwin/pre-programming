import { useCallback } from "react";
import styled from "styled-components";
import React from "react";
import { quizColors } from "@color/quizColors";
import { isNil } from "@utils/typeGuard";

import {
  explode,
  dropOne,
  dropTwo,
  dropThree,
  dropFour,
  dropFive,
  dropSeven,
  dropSix,
  dropZero,
} from "assets/keyframes/RootKeyFrame";

interface Props {
  answers: string[];
  currentStep: number;
  currentUserAnswer: number;
  setCurrentUserAnswer: React.Dispatch<React.SetStateAction<number>>;
}

export function ProblemCheckList({
  answers,
  setCurrentUserAnswer,
  currentUserAnswer,
}: Props) {
  const createLabelKey = useCallback(
    (labelIdx: number) => `label${labelIdx}`,
    []
  );

  const handleInputClick = (evt: React.MouseEvent<HTMLInputElement>) => {
    const index = evt.currentTarget.dataset.index;
    if (isNil(index)) return;
    setCurrentUserAnswer(Number(evt.currentTarget.dataset.index));
  };

  return (
    <Ul>
      {answers.map((el, index) => (
        <Li key={index}>
          <Input
            type="radio"
            name="answers"
            checked={currentUserAnswer === index + 1}
            id={createLabelKey(index)}
            onClick={handleInputClick}
            data-index={index + 1}
          />
          <Label htmlFor={createLabelKey(index)}>{el}</Label>
          <Bullet>
            <BulletLineZero />
            <BulletLineOne />
            <BulletLineTwo />
            <BulletLineThree />
            <BulletLineFour />
            <BulletLineFive />
            <BulletLineSix />
            <BulletLineSeven />
          </Bullet>
        </Li>
      ))}
    </Ul>
  );
}

const Ul = styled.ul`
  margin: auto;
  margin-top: 40px;
  border: 2px solid transparent;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  cursor: pointer;
  li {
    position: relative;
    padding: 10px 10px 10px 60px;
    display: flex;
  }
`;

const Label = styled.label<React.LabelHTMLAttributes<HTMLLabelElement>>`
  cursor: pointer;
  color: ${quizColors.quiz.lableColor};
  font-weight: 700;
  margin-left: 20px;
  font-size: 22px;
  &:before {
    content: "";
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    left: 2.5px;
    top: 17.5px;
    box-sizing: border-box;
    border-radius: 50%;
  }
`;

const Input = styled.input<React.InputHTMLAttributes<HTMLInputElement>>`
  opacity: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  cursor: pointer;

  &:checked ~ div {
    opacity: 1;
    animation-name: ${explode};
    animation-duration: 0.35s;
    div {
      animation-delay: 0.1s;
      animation-duration: 0.9s;
      animation-fill-mode: forwards;
    }
    div:nth-child(1) {
      animation-name: ${dropZero};
    }
    div:nth-child(2) {
      animation-name: ${dropOne};
    }
    div:nth-child(3) {
      animation-name: ${dropTwo};
    }
    div:nth-child(4) {
      animation-name: ${dropThree};
    }
    div:nth-child(5) {
      animation-name: ${dropFour};
    }
    div:nth-child(6) {
      animation-name: ${dropFive};
    }
    div:nth-child(7) {
      animation-name: ${dropSix};
    }
    div:nth-child(8) {
      animation-name: ${dropSeven};
    }
  }
`;

const Li = styled.li<React.LiHTMLAttributes<HTMLLIElement>>`
  width: 500px;
  :hover {
    opacity: 0.6;
    transition: ease-in-out 0.3s opacity;
  }
`;

const Bullet = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: calc(-15px / 2);
  top: calc(15px / 2);
  border: 5px solid #fff;
  border-radius: 50%;
  opacity: 0;
`;

const Line = styled.div`
  position: absolute;
  width: 10px;
  height: 2px;
  border: 1px solid ${quizColors.quiz.selectedColor};
  background-color: #fff;
  opacity: 1;
`;

const BulletLineZero = styled(Line)`
  left: 11px;
  top: -21px;
  transform: translateY(9px);
  width: 2px;
  height: 10px;
`;
const BulletLineOne = styled(Line)`
  right: -12px;
  top: -10px;
  transform: rotate(-45deg) translate(-9px);
`;
const BulletLineTwo = styled(Line)`
  right: -20px;
  top: 11px;
  transform: translate(-9px);
`;
const BulletLineThree = styled(Line)`
  right: -12px;
  top: 32px;
  transform: rotate(55deg) translate(-9px);
`;
const BulletLineFour = styled(Line)`
  left: -10px;
  top: -11px;
  transform: rotate(55deg) translate(9px);
`;
const BulletLineFive = styled(Line)`
  left: -20px;
  top: 11px;
  transform: translate(9px);
`;
const BulletLineSix = styled(Line)`
  left: -8px;
  top: 33px;
  transform: rotate(-55deg) translate(9px);
`;

const BulletLineSeven = styled(Line)`
  width: 2px;
  height: 10px;
  left: 11px;
  bottom: -22px;
  transform: translateY(-9px);
`;
