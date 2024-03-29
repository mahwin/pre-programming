import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DownArrowSvg } from "@svg";
import { userInfoColors } from "@color/userInfoColors";
import { IAvatars } from "@type/userInfo";

const Wrapper = styled(motion.section)`
  position: absolute;
  bottom: 5%;
  right: 10%;
  height: 370px;
  width: 280px;
  border-radius: 18px;
  z-index: 3;
  overflow: hidden;
  text-align: center;
  color: white;
`;

const AvatarsWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const BtnBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button<React.HTMLAttributes<HTMLButtonElement>>`
  width: 50px;
  border: none;
  background-color: inherit;
  color: inherit;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const Title = styled.h3`
  color: inherit;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
`;
const Items = styled(motion.ul)`
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  row-gap: 30px;
`;

const Item = styled(motion.li)`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  :hover {
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
    backgroundColor: userInfoColors.avatarBgColor,
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
    backgroundColor: userInfoColors.avatarBgColor,
    opacity: 0,
    transition: {
      clipPath: { duration: 1.5 },
      opacity: { delay: 2 },
    },
  },
};

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
    <Wrapper variants={wrapperVariants} animate={isOpen ? "open" : "closed"}>
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
          <section>
            <Items>
              {avatarList.map((avatar, idx) => (
                <Item key={idx + ""} onClick={onSelect} id={avatar + ""} layout>
                  <figure>
                    <Image
                      src={`/avatars/${avatar}.png`}
                      layout="fill"
                      alt="아바타 이미지입니다."
                    />
                  </figure>
                </Item>
              ))}
            </Items>
          </section>
        </AvatarsWrapper>
      </motion.div>
    </Wrapper>
  );
}
