import styled from "styled-components";
import {
  LogoSvg,
  MailSvg,
  MapPinSvg,
  PhoneSvg,
  FacebookSvg,
  TwitterSvg,
  GithubSvg,
  SendSvg,
} from "../assets/svg/RootSvg";

const Wrapper = styled.footer`
  background-color: #141414;
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 80vh;
  margin-top: 50px;
  padding: 30px;
  max-width: ${(props) => props.theme.windowSize.pc};
  display: flex;
  flex-direction: column;
`;

const ColumnBox = styled.div`
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
  color: #dfe6e9;
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

const LogoBox = styled.div`
  padding: 5px;
  margin-right: 20px;
`;

const FooterMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vh;
`;

const SnsBox = styled.div`
  display: flex;
  width: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const LinksWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
`;

const Links = styled.ul`
  gap: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const LinkItem = styled.li`
  display: flex;
  h4:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colorTheme.hoverPrimary};
    text-decoration: underline;
  }
`;
const EmailWrapper = styled.div`
  height: 60%;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-top: 20px;
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
  color: #2d3436;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  background-color: #2d3436;
`;

const Button = styled.button`
  width: 20%;
  height: 40px;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  border: none;
`;

const FooterBottom = styled.footer`
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  height: 5vh;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export default function Footer() {
  return (
    <Wrapper>
      <FooterWrapper>
        <ColumnBox>
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
        </ColumnBox>
        <Line />
        <ColumnBox>
          <FooterMiddleBox style={{ justifyContent: "space-between" }}>
            <Box>
              <LogoBox>
                <LogoSvg width="40" height="60" />
              </LogoBox>
              <TitleBox>
                <Title>Pre-programming</Title>
              </TitleBox>
            </Box>
            <SubTitle>: What to do before you studying programming!</SubTitle>
            <Title>Follow us</Title>
            <SnsBox>
              <FacebookSvg width="40" height="40" />
              <TwitterSvg width="40" height="40" />
              <GithubSvg width="40" height="40" />
            </SnsBox>
          </FooterMiddleBox>
          <FooterMiddleBox>
            <Box>
              <TitleBox>
                <Title>Useful Links</Title>
                <TitleLine />
              </TitleBox>
            </Box>
            <LinksWrapper>
              <Links>
                <LinkItem>
                  <SubTitle>Home</SubTitle>
                </LinkItem>
                <LinkItem>
                  <SubTitle>About</SubTitle>
                </LinkItem>
                <LinkItem>
                  <SubTitle>Services</SubTitle>
                </LinkItem>
                <LinkItem>
                  <SubTitle>Contact Us</SubTitle>
                </LinkItem>
              </Links>
            </LinksWrapper>
          </FooterMiddleBox>
          <FooterMiddleBox>
            <Box>
              <TitleBox>
                <Title>Subscribe</Title>
                <TitleLine />
              </TitleBox>
            </Box>
            <EmailWrapper>
              <SubTitle>
                Don’t miss to subscribe to our new feeds, kindly fill the form
                below.
              </SubTitle>
              <InputWrapper>
                <Input />
                <Button>
                  <SendSvg width="24" height="24" />
                </Button>
              </InputWrapper>
            </EmailWrapper>
          </FooterMiddleBox>
        </ColumnBox>
      </FooterWrapper>
      <FooterBottom />
    </Wrapper>
  );
}
