import styled from "styled-components";
import { motion } from "framer-motion";

interface OverlayProps {
  children: React.ReactNode;
  handleClick: () => void;
}

export function Overlay({ children, handleClick }: OverlayProps) {
  return (
    <Wrapper
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      exit={{ backgroundColor: "rgba(0,0,0,0)" }}
      onClick={handleClick}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;

  justify-content: center;
  align-items: center;
`;
