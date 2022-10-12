import styled from "styled-components";
import { motion } from "framer-motion";
import React, { MouseEvent, useState } from "react";
import { IUser } from "../../redux/user/user.dto";
import Image from "next/image";
import { ChangeSvg } from "@svg";
import Avatars from "./Avatars";
import Form from "./Form";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  position: relative;
  background-color: #00cec9;
  max-width: ${(props) => props.theme.windowSize.tablet};
  width: 400px;
  height: 500px;
  border-radius: 20px;
  box-shadow: rgba(249, 207, 207, 0.15) 0px 8px 16px 0px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  padding: 30px 5px 30px 5px;
  width: 100%;
  justify-content: space-around;
  h1 {
    margin-top: 24px;
    margin-bottom: 30px;
    font-size: 30px;
    color: white;
    font-weight: 700;
  }
`;

const Cicle = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  margin: 0 auto;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: transparent;
`;

const ToggleBox = styled.div`
  width: 120px;
  margin-top: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;
const NormalSpan = styled.span`
  font-weight: 900;
  color: white;
`;

const Button = styled.button`
  border: none;
  color: white;
  width: 80px;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  background-color: #3b82f6;
`;

const Toggle = styled(motion.button)`
  appearance: none;
  border: none;
  margin-top: 10px;
  padding: 0;
  width: 80px;
  height: 5px;
  background-color: rgb(162, 155, 254);
  /* background-color: orange; */
  display: flex;
  justify-content: flex-start;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
`;

const ToggleCircle = styled(motion.div)`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: -8px;
`;

const Label = styled(motion.label)`
  color: #a29bfe;
  font-size: 24px;
  font-weight: 900;
  top: -5px;
  left: 35px;
  position: absolute;
`;

const SvgBox = styled(motion.div)`
  position: absolute;
  right: -28px;
  bottom: 5px;

  cursor: pointer;
`;

const toggleCircleVariants = {
  left: { x: 0, backgroundColor: "rgb(162, 155, 254)" },
  right: { x: 60, backgroundColor: "rgb(118, 111, 211)" },
};

const toggleBarVariants = {
  left: { background: "rgb(255,255,255)", transition: { duration: 1 } },
  right: { background: "rgb(162,155,254)", transition: { duration: 1 } },
};

const changeVariants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, transition: { duration: 1 } },
};

const AvatarsWrapper = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 400px;
  width: 600px;
  z-index: 3;
  background-color: skyblue;
`;

const bounceY = [-100, 20, -10, 5, -3, 0];

export default function UserInfo({ data }: { data: IUser }) {
  const [Mutatable, setMutatable] = useState(false);
  const [avatar, setAvatar] = useState<string>(data.avatar);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);

  const canChangeSwitch = () => {
    setMutatable(!Mutatable);
    setIsAvatarsOpen(false);
  };

  const onClickAvatars = () => setIsAvatarsOpen(!isAvatarsOpen);
  const onSelectedAvatar = (e: MouseEvent) => {
    setAvatar(e.currentTarget.id);
  };
  return (
    <>
      <Wrapper>
        <Row>
          <Header>
            <h1>Profile</h1>
            <ToggleBox onChange={canChangeSwitch}>
              <div style={{ position: "relative" }}>
                <NormalSpan>CAN</NormalSpan>
                {!Mutatable ? (
                  <>
                    <NormalSpan
                      style={{ color: "#a29bfe", position: "absolute" }}
                    >
                      '
                    </NormalSpan>
                    <Label
                      initial={false}
                      animate={{ y: bounceY }}
                      transition={{ duration: 2.5 }}
                    >
                      <span>T</span>
                    </Label>
                  </>
                ) : null}
                <NormalSpan style={{ marginLeft: "24px" }}>CHANGE</NormalSpan>
              </div>
              <Toggle
                initial={false}
                variants={toggleBarVariants}
                onClick={canChangeSwitch}
                animate={Mutatable ? "left" : "right"}
              >
                <ToggleCircle
                  initial={false}
                  variants={toggleCircleVariants}
                  animate={Mutatable ? "left" : "right"}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </Toggle>
            </ToggleBox>
          </Header>
          <Cicle>
            <Image src={`/avatar/${avatar}.png`} layout="fill" />
            {Mutatable && (
              <SvgBox
                onClick={onClickAvatars}
                variants={changeVariants}
                initial="hidden"
                animate="visible"
              >
                <ChangeSvg width="30" height="30" color="#a29bfe" />
              </SvgBox>
            )}
          </Cicle>
          <Form
            data={{ name: data.name, phone: data.phone }}
            isAvatarChange={avatar !== data.avatar ? true : false}
            isCan={Mutatable}
          />
        </Row>
      </Wrapper>
      {Mutatable && (
        <Avatars
          avatar={avatar}
          isOpen={isAvatarsOpen}
          onClick={onClickAvatars}
          onSelect={onSelectedAvatar}
        />
      )}
    </>
  );
}
