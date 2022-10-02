import styled from "styled-components";

const Cicle = styled.div`
  z-index: 99;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
`;

const Shape = styled.div`
  position: absolute;
  top: -1px;
  font-size: 50px;
  font-weight: 600;
  color: white;
`;

interface IFloating {
  text: string;
}

function FloatingButton({ text }: IFloating) {
  return (
    <Cicle>
      <Shape>{text}</Shape>
    </Cicle>
  );
}

export default FloatingButton;
