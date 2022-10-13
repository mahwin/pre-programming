import styled from "styled-components";
import { motion } from "framer-motion";
import { DownArrowSvg } from "@svg";
import Image from "next/image";
import React, { useEffect, useState, MouseEvent } from "react";

const BtnWapper = styled(motion.div)`
  position: absolute;
  border-radius: 18px;
  bottom: 30px;
  right: 10%;
  background-color: transparent;
  overflow: hidden;
  height: 60%;
  width: 280px;
  z-index: 3;
`;

const AvatarsWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: transparent;
`;

const BtnBox = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 50px;
  border: none;
  background-color: transparent;
  color: white;
  padding: 20px 10px 0px 0px;
  font-size: 24px;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const Title = styled.h3`
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
`;
const Items = styled(motion.ul)`
  position: relative;
  width: 100%;
  height: 70%;
  padding: 24px;
  display: grid;
  gap: 24px;
  row-gap: 30px;
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled(motion.li)`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  :hover {
    transform: scale(1.2);
    border-radius: 30px;
    border: 2px solid orange;
  }
`;

const wrapperVariants = {
  open: {
    display: "block",
    transition: {
      display: { delay: 0 },
    },
  },
  closed: {
    display: "none",
    transition: {
      display: { delay: 2 },
    },
  },
};

const avatarVariants = {
  open: {
    clipPath: "circle(500px at 40px 40px)",
    backgroundColor: "#06acf9",
    opacity: 1,
    transition: {
      clipPath: { duration: 1.5 },
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    backgroundColor: "#06acf9",
    opacity: 0,
    transition: {
      clipPath: { duration: 1.5 },
      opacity: { delay: 2 },
    },
  },
};

interface IAvatars {
  isOpen: boolean;
  avatar: string;
  onClick: () => void;
  onSelect: (e: MouseEvent) => void;
}

export default function Avatars({
  isOpen,
  avatar,
  onClick,
  onSelect,
}: IAvatars) {
  const [avatarList, setAvatarList] = useState<number[]>([]);

  useEffect(() => {
    const allList = Array.from({ length: 10 }, (v, i) => i + 1);
    setAvatarList(allList.filter((num) => num + "" !== avatar));
  }, [avatar]);
  return (
    <BtnWapper variants={wrapperVariants} animate={isOpen ? "open" : "closed"}>
      <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
        <AvatarsWrapper
          variants={avatarVariants}
          transition={{
            default: {
              type: "spring",
              stiffness: 400,
              damping: 40,
            },
          }}
        >
          <BtnBox>
            <Button onClick={onClick}>
              <DownArrowSvg />
            </Button>
          </BtnBox>
          <Title>Choose your avatar!</Title>
          <Items>
            {avatarList.map((avatar, idx) => (
              <Item key={idx + ""} onClick={onSelect} id={avatar + ""} layout>
                <Image src={`/avatar/${avatar}.png`} layout="fill" />
              </Item>
            ))}
          </Items>
        </AvatarsWrapper>
      </motion.div>
    </BtnWapper>
  );
}
