import styled from "styled-components";
import React, { useState, useCallback } from "react";
import { BellSvg, CopySvg } from "@svg";
import { vibration, fadeInAndOut } from "assets/keyframes/RootKeyFrame";
import { SignInColors } from "@color/SignInColors";
import { motion, AnimatePresence, Variants } from "framer-motion";

const Wrapper = styled.section`
  z-index: 99;
  display: flex;
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

const HelperBtn = styled.button`
  z-index: 99;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  :hover {
    p {
      display: inline-block;
    }
  }
`;

const SvgBox = styled.div`
  width: 100%;
  height: 100%;
  animation: ${vibration} 0.2s infinite ease-in-out alternate;
`;

const Description = styled.p`
  z-index: 2;
  display: none;
  padding: 10px;
  position: absolute;
  width: 110px;
  left: -35px;
  top: -95px;
  height: 80px;
  border-radius: 8px;
  background-color: ${SignInColors.helper.labelColor};
  border-bottom-color: red;
  text-align: left;
  color: #fff;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.base};
  line-height: 20px;
  &:after {
    position: absolute;
    top: 100%;
    left: 16px;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border: 1px solid red;
    transform: rotate(180deg);
    border-color: transparent;
    border-bottom-color: ${SignInColors.helper.labelColor};
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-width: 10px;
    pointer-events: none;
    content: "";
  }
`;

const Public = styled(motion.section)`
  position: absolute;
  right: 0;
  top: -120px;
  width: 300px;
  z-index: 100;
  height: 0;
  background-color: darkgray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const InfoBox = styled.div`
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-evenly;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.base};
  label {
    display: flexbox;
    width: 55px;
    border-bottom: 2px solid transparent;
  }
  :hover {
    label:nth-child(2) {
      border-bottom: 2px solid ${(props) => props.theme.colorTheme.hoverPrimary};
      transition: all 0.5s ease-in-out;
    }
  }
`;

const CopyBtn = styled.button`
  background-color: transparent;
  margin-left: 10px;
  :hover {
    transform: scale(1.2);
    transition: 0.3s ease-in-out;
  }
`;

const CopyAlarm = styled.section`
  position: fixed;
  margin: 0 auto;
  z-index: 999;
  left: 50px;
  bottom: 20px;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInAndOut} 2s;

  span {
    color: white;
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    letter-spacing: 0.1rem;
  }
`;

const PublicVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "100px",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(100% 0% 0% 0%)",
    height: "0",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
};

export default function Helper() {
  const [isOpen, setOpen] = useState(false);
  const [isCopy, setCopy] = useState({
    isClicked: false,
    data: "",
  });
  const onClick = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const onClickCopy = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { type, value } = event.currentTarget.dataset;

      const $textarea = document.createElement("textarea");
      document.body.appendChild($textarea);
      $textarea.value = value!;
      $textarea.select();
      // document.execCommand는 deprecated
      // but Clipboard API는 IE X라서 일단 사용함.
      document.execCommand("copy");
      document.body.removeChild($textarea);
      setCopy({ isClicked: true, data: type! });
      setTimeout(() => {
        setCopy({ isClicked: false, data: "" });
      }, 2000);
    },
    []
  );

  return (
    <>
      <Wrapper>
        <HelperBtn onClick={onClick}>
          <Description>{"공용 아이디가 필요하면  클릭하세요!"}</Description>
          <SvgBox>
            <BellSvg />
          </SvgBox>
        </HelperBtn>
        <AnimatePresence>
          <Public variants={PublicVariants} animate={isOpen ? "open" : "close"}>
            {isOpen && (
              <>
                <InfoBox>
                  <label>PHONE</label>
                  <label>01012341234</label>
                  <CopyBtn
                    data-type="PHONE"
                    data-value="01012341234"
                    onClick={onClickCopy}
                  >
                    <CopySvg />
                  </CopyBtn>
                </InfoBox>
                <InfoBox>
                  <label>TOKEN</label>
                  <label>000000</label>

                  <CopyBtn
                    data-type="TOKEN"
                    data-value="000000"
                    onClick={onClickCopy}
                  >
                    <CopySvg />
                  </CopyBtn>
                </InfoBox>
              </>
            )}
          </Public>
        </AnimatePresence>
      </Wrapper>
      {isCopy.isClicked && (
        <CopyAlarm>
          <span>{`COPIED! PUBLIC ${isCopy.data}`}</span>
        </CopyAlarm>
      )}
    </>
  );
}
