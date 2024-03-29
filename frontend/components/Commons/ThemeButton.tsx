import { motion } from "framer-motion";
import styled from "styled-components";
import { MoonSvg, SunSvg } from "@svg";

const ToggleBox = styled.div<React.HTMLAttributes<HTMLElement>>`
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

const Shadow = styled(motion.div)<{ isdark: number }>`
  height: 100%;
  width: 60%;
  border-radius: 15px;
  position: absolute;
  background-color: white;
  opacity: 0.3;
  ${(props) => (props.isdark ? "left: -5px;" : "right: -5px;")}
`;

const ToggleItem = styled.div`
  display: flex;
`;

interface IThemeButtonProps {
  onClick: () => void;
  isDark: boolean;
}

function ThemeButton({ onClick, isDark }: IThemeButtonProps) {
  return (
    <ToggleBox onClick={onClick}>
      <Shadow isdark={isDark ? 1 : 0} layout />
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
