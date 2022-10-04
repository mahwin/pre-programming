import styled from "styled-components";
import { FolderOpenSvg } from "../assets/svg/RootSvg";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  border-radius: 5px;
  padding: 24px;
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 20px;
`;
const Button = styled.button`
  height: 50px;
  width: 150px;
  border: none;
  color: #dfe6e9;
  font-size: 20px;
  background-color: #949fb0;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
    transition: all 0.2s ease-in-out;
    transform: scale(1.05);
  }
  p {
    margin-right: 10px;
  }
`;
const Card = styled.div`
  height: 10vh;
  width: 100%;
  border-radius: 3px;
  background-color: red;
`;

interface IAddVoca {
  vocas: boolean[];
}

export default function AddVaca({ vocas }: IAddVoca) {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      <ButtonBox>
        <Button>
          <p>CARD</p>
          <FolderOpenSvg />
        </Button>
        <Button>단어장에 저장</Button>
      </ButtonBox>
    </Wrapper>
  );
}
