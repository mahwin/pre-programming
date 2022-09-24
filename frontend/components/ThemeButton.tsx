import { motion } from "framer-motion";
import styled from "styled-components";

const ToggleBox = styled.div<{ isDark: boolean }>`
  position: absolute;
  width: 150px;
  top: 4px;
  height: 40px;
  right: 400px;
  margin-right: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  overflow: hidden;
  cursor: pointer;
  justify-content: ${(props) => (props.isDark ? "end" : "start")};
`;

const Toggle = styled(motion.div)`
  z-index: 1;
  height: 100%;
  width: 80px;
  border-radius: 20px;
  background-color: white;
  opacity: 0.3;
`;

const ToggleItem = styled.p<{ isRight: boolean }>`
  position: absolute;
  ${(props) => (props.isRight ? "right: 20px;" : "left: 20px;")};
  font-size: 20px;
  font-weight: 400;
  color: white;
`;

function ThemeButton({ onClick, isDark }: any) {
  return (
    <ToggleBox isDark={isDark} onClick={onClick}>
      <Toggle layout />
      <ToggleItem isRight={false}>Light</ToggleItem>
      <ToggleItem isRight={true}>Dark</ToggleItem>
    </ToggleBox>
  );
}
export default ThemeButton;
