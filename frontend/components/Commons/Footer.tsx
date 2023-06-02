import styled from "styled-components";
import { useCallback } from "react";
import {
  LogoSvg,
  MailSvg,
  MapPinSvg,
  PhoneSvg,
  FacebookSvg,
  TwitterSvg,
  GithubSvg,
  SendSvg,
} from "@svg";
import Link from "next/link";
import { footerColors } from "@color/footerColors";

const Wrapper = styled.footer`
  background-color: ${footerColors.bgColor};
  opacity: 0.9;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Container = styled.section`
  width: 100%;
  height: 80vh;
  margin-top: 40px;
  padding: 30px;
  max-width: ${(props) => props.theme.windowSize.pc};
  display: flex;
  flex-direction: column;
`;

const Row = styled.section`
  display: grid;
  height: 25%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const TitleBox = styled.div``;

const Title = styled.h3`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${footerColors.titleColor};
`;

const SubTitle = styled.h4`
  line-height: 25px;
  font-weight: ${(props) => props.theme.fontWeight.base};
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colorTheme.textSecondary};
`;

const SvgBox = styled.div`
  padding-right: 20px;
`;

const Line = styled.hr`
  width: 100%;
  margin-bottom: 50px;
  border-width: 0.5px;
  border-radius: 1px;
  border-color: ${(props) => props.theme.colorTheme.textSecondary};
`;

const TitleLine = styled.hr`
  margin: 5px 0;
  width: 50%;
  border-radius: 2px;
  height: 3px;
  border: none;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vh;
`;

const LogoBox = styled.div`
  display: flex;
  margin-top: -15px;
  gap: 15px;
  align-items: center;
`;

const SnsBox = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
`;

const Links = styled.ul`
  gap: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const LinkItem = styled.li`
  h4:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colorTheme.hoverPrimary};
    text-decoration: underline;
    transition: ease-in-out 0.3s;
  }
`;
const EmailBox = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-top: 30px;
  display: flex;
`;

const Input = styled.input.attrs({
  type: "email",
  placeholder: "your@email.com",
  require: true,
})`
  ::placeholder {
    color: white;
    opacity: 0.3;
  }
  padding: 10px;
  width: 80%;
  border: none;
  height: 40px;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  background-color: ${footerColors.inputBgColor};
  color: ${footerColors.inputColor};
`;

const Button = styled.button`
  width: 20%;
  height: 40px;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  border: none;
`;

export default function Footer() {
  const notYetClick = useCallback(() => {
    alert("준비 중입니다!");
  }, []);

  return (
    <Wrapper>
      <Container>
        <Row>
          <Box>
            <SvgBox>
              <MapPinSvg width="50" height="50" />
            </SvgBox>
            <TitleBox>
              <Title>Find us</Title>
              <SubTitle>Republic of Korea</SubTitle>
            </TitleBox>
          </Box>
          <Box>
            <SvgBox>
              <PhoneSvg width="50" height="50" />
            </SvgBox>
            <TitleBox>
              <Title>Call us</Title>
              <SubTitle>+82 1027597085</SubTitle>
            </TitleBox>
          </Box>
          <Box>
            <SvgBox>
              <MailSvg width="50" height="50" />
            </SvgBox>
            <TitleBox>
              <Title>Mail us</Title>
              <SubTitle>mahwin7085@gmail.com</SubTitle>
            </TitleBox>
          </Box>
        </Row>
        <Line />
        <Row>
          <BottomBox style={{ justifyContent: "space-between" }}>
            <Box>
              <LogoBox>
                <LogoSvg width="40" height="60" />
                <Title>Pre-programming</Title>
              </LogoBox>
            </Box>
            <SubTitle>: What to do before you studying programming!</SubTitle>
            <Title>Follow us</Title>
            <nav>
              <SnsBox>
                <a onClick={notYetClick}>
                  <FacebookSvg width="40" height="40" />
                </a>
                <a onClick={notYetClick}>
                  <TwitterSvg width="40" height="40" />
                </a>
                <Link href="https://github.com/mahwin">
                  <a target="_blank" rel="noopener noreferrer">
                    <GithubSvg width="40" height="40" />
                  </a>
                </Link>
              </SnsBox>
            </nav>
          </BottomBox>
          <BottomBox>
            <Box>
              <TitleBox>
                <Title>Useful Links</Title>
                <TitleLine />
              </TitleBox>
            </Box>
            <LinkWrapper>
              <nav>
                <Links>
                  {["Home", "About", "Services", "Contact Us"].map((info) => (
                    <LinkItem key={info} onClick={notYetClick}>
                      <SubTitle>{info}</SubTitle>
                    </LinkItem>
                  ))}
                </Links>
              </nav>
            </LinkWrapper>
          </BottomBox>
          <BottomBox>
            <Box>
              <TitleBox>
                <Title>Subscribe</Title>
                <TitleLine />
              </TitleBox>
            </Box>
            <EmailBox>
              <SubTitle>
                Don’t miss to subscribe to our new feeds, kindly fill the form
                below.
              </SubTitle>
              <InputWrapper>
                <Input />
                <Button onClick={notYetClick}>
                  <SendSvg width="24" height="24" />
                </Button>
              </InputWrapper>
            </EmailBox>
          </BottomBox>
        </Row>
      </Container>
    </Wrapper>
  );
}
