import styled from "styled-components";
import { motion } from "framer-motion";
import { DownArrowSvg } from "../assets/svg/DownArrowSvg";
import Image from "next/image";
import { useEffect, useState } from "react";

const BtnWapper = styled(motion.div)`
  position: absolute;
  height: 60%;
  width: 25%;
  border-radius: 18px;
  bottom: 30px;
  right: 30px;
  background-color: transparent;
  overflow: hidden;
  cursor: pointer;
`;

const AvatarsWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: transparent;
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
  row-gap: 40px;
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled(motion.li)`
  position: relative;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  :hover {
    transform: scale(1.2);
    border-radius: 30px;
    border: 2px solid orange;
  }
`;

const avatarVariants = {
  open: {
    clipPath: "circle(500px at 40px 40px)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
    background: "skyblue",
  },
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    display: "none",
  },
};

interface IAvatars {
  isOpen: boolean;
  currentAvartar: string;
  avatarSwitch: () => void;
}

export default function Avatars({
  isOpen,
  avatarSwitch,
  currentAvartar,
}: IAvatars) {
  const [avatarList, setAvatarList] = useState<number[]>([]);

  useEffect(() => {
    const allList = Array.from({ length: 10 }, (v, i) => i + 1);
    console.log(allList);
    setAvatarList(allList.filter((num) => num + "" !== currentAvartar));
  }, []);
  return (
    <BtnWapper>
      <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
        <AvatarsWrapper
          variants={avatarVariants}
          transition={{
            default: {
              delay: 0.5,
              type: "spring",
              stiffness: 400,
              damping: 40,
            },
            display: { duration: 2, delay: 1.5 },
          }}
        >
          <BtnBox>
            <Button onClick={avatarSwitch}>
              <DownArrowSvg />
            </Button>
          </BtnBox>
          <Title>Choose your avatar!</Title>
          <Items>
            {avatarList.map((avatar) => (
              <Item>
                <Image src={`/avatar/${avatar}.png`} layout="fill" />
              </Item>
            ))}
          </Items>
        </AvatarsWrapper>
      </motion.div>
    </BtnWapper>
  );
}
