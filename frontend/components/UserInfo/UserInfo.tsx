import styled from "styled-components";
import { motion } from "framer-motion";
import React, { MouseEvent, useEffect, useState } from "react";
import { IUser } from "@redux/user/user.dto";
import Image from "next/image";
import { ChangeSvg, LoadingSvg } from "@svg";
import dynamic from "next/dynamic";
import Form from "./Form";
import PageLoading from "@components/Commons/PageLoading";
import { userInfoColors } from "@color/userInfoColors";

const Avatars = dynamic(() => import("./Avatars"), {
  ssr: false,
  loading: () => <LoadingSvg />,
});

const Wrapper = styled.main`
  width: 400px;
  margin: 100px auto;
`;

const Container = styled.section`
  position: relative;
  height: 500px;
  max-width: ${(props) => props.theme.windowSize.tablet};
  border-radius: 20px;
  background-color: ${() => userInfoColors.bgColor};
  box-shadow: rgba(249, 207, 207, 0.15) 0px 8px 16px 0px;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  padding: 30px 5px 30px 5px;
  width: 100%;
  justify-content: space-around;
  h1 {
    margin: 24px 0 30px 0;
    font-size: 30px;
    color: white;
    font-weight: ${(props) => props.theme.fontWeight.xxbold};
  }
`;

const Avartar = styled.div`
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const ToggleBox = styled.div`
  width: 120px;
  height: 40px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NormalSpan = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  color: white;
`;

const Toggle = styled(motion.button)`
  appearance: none;
  border: none;
  margin-top: 10px;
  padding: 0;
  width: 80px;
  height: 5px;
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
  position: absolute;
  top: -8px;
`;

const Label = styled(motion.label)`
  color: ${() => userInfoColors.highlightColor};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  top: -5px;
  left: 38px;
  position: absolute;
`;

const SvgBox = styled(motion.div)`
  position: absolute;
  right: -28px;
  bottom: 5px;
  cursor: pointer;
`;

const toggleCircleVariants = {
  left: { x: 0, backgroundColor: userInfoColors.toggle.bar },
  right: { x: 60, backgroundColor: userInfoColors.toggle.cicle },
};

const toggleBarVariants = {
  left: { background: "rgb(255,255,255)", transition: { duration: 1 } },
  right: { background: userInfoColors.toggle.bar, transition: { duration: 1 } },
};

const changeVariants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, transition: { duration: 1 } },
};

const bounceY = [-100, 20, -10, 5, -3, 0];

export default function UserInfo({ data }: { data: IUser }) {
  const [Mutatable, setMutatable] = useState(false);
  const [avatar, setAvatar] = useState<string>(data?.avatar);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);

  const canChangeSwitch = () => {
    setMutatable(!Mutatable);
    setIsAvatarsOpen(false);
  };

  useEffect(() => {
    setAvatar(data?.avatar);
  }, [data]);

  const onClickAvatars = () => setIsAvatarsOpen(!isAvatarsOpen);
  const onSelectedAvatar = (e: MouseEvent) => {
    setAvatar(e.currentTarget.id);
  };

  return (
    <>
      {!data ? (
        <PageLoading />
      ) : (
        <>
          <Wrapper>
            <Container>
              <Header>
                <h1>Profile</h1>
                <ToggleBox onChange={canChangeSwitch}>
                  <div>
                    <NormalSpan>CAN</NormalSpan>
                    {!Mutatable && (
                      <>
                        <NormalSpan
                          style={{
                            color: userInfoColors.highlightColor,
                            position: "absolute",
                          }}
                        >
                          &rsquo;
                        </NormalSpan>
                        <Label
                          animate={{ y: bounceY }}
                          transition={{ duration: 2.5 }}
                        >
                          T
                        </Label>
                      </>
                    )}
                    <NormalSpan style={{ marginLeft: "24px" }}>
                      CHANGE
                    </NormalSpan>
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
              <Avartar>
                <figure>
                  <Image
                    alt="아바타 이미지입니다."
                    src={`/avatars/${avatar}.png`}
                    layout="fill"
                    priority
                  />
                </figure>
                {Mutatable && (
                  <SvgBox
                    onClick={onClickAvatars}
                    variants={changeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ChangeSvg
                      width="30"
                      height="30"
                      color={userInfoColors.svgColor}
                    />
                  </SvgBox>
                )}
              </Avartar>
              <Form
                data={{
                  name: data?.name,
                  phone: data?.phone,
                  currentAvatar: avatar,
                }}
                isAvatarChange={avatar !== data?.avatar ? true : false}
                isCan={Mutatable}
              />
            </Container>
          </Wrapper>
        </>
      )}
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
