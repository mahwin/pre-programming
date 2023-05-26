import { motion } from "framer-motion";
import styled from "styled-components";

import { MoonSvg } from "assets/svg/MoonSvg";
import { SunSvg } from "assets/svg/SunSvg";

const ToggleBox = styled.div<{ isDark: boolean }>`
  position: fixed;
  right: 5%;
  top: 10%;
  width: 100px;
  height: 30px;
  border-radius: 20px;

  z-index: 100;
  overflow: hidden;
  cursor: pointer;
  background-color: black;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Shadow = styled(motion.div)<{ isDark: boolean }>`
  height: 100%;
  width: 50%;
  border-radius: 20px;
  position: absolute;
  background-color: white;
  opacity: 0.3;
  ${(props) => (props.isDark ? "right: 0;" : "left: 0")}
`;

const ToggleItem = styled.div`
  display: flex;
`;

function ThemeButton({ onClick, isDark }: any) {
  return (
    <ToggleBox isDark={isDark} onClick={onClick}>
      <Shadow layout isDark={isDark} />
      <ToggleItem>
        <SunSvg width="25" height="30" />
      </ToggleItem>
      <ToggleItem>
        <MoonSvg width="25" height="30" />
      </ToggleItem>
    </ToggleBox>
  );
}
export default ThemeButton;
