import styled from "styled-components";
import { TwitterSvg, FacebookSvg } from "../assets/svg/RootSvg";

const Wapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  min-width: ${(props) => props.theme.windowSize.mobile};
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const TitleBox = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  font-size: ${(props) => props.theme.fontSize.xlg};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const SubTitle = styled.h4`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.base};
  color: ${(props) => props.theme.colorTheme.textSecondary};
`;
const Line = styled.hr`
  text-align: center;
  width: 100%;
  border-radius: 2px;
  height: 3px;
  border: none;
  background-color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const Text = styled.p`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.base};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const PhoneBox = styled.div`
  width: 100%;
`;
const InputBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;

const PostInput = styled.span`
  width: 10%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => props.theme.colorTheme.textSecondary};
  p {
    font-size: 18px;
  }
`;
const Input = styled.input.attrs({
  type: "number",
})`
  padding: 5px;
  width: 90%;
  height: 40px;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${(props) => props.theme.fontSize.lg};
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.activePrimary};
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 40px;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  background-color: ${(props) => props.theme.colorTheme.textSecondary};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.base};
  :hover {
    border: 2px solid ${(props) => props.theme.colorTheme.hoverPrimary};
  }
`;

const TextLineBox = styled.div`
  position: relative;
  text-align: center;
  margin-top: 3px;
  margin-bottom: 25px;
  height: 3px;
  width: 100%;

  background-color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const TextInLine = styled(Text)`
  position: absolute;
  right: 0;
  left: 0;
  top: -12px;
  margin: 0 auto;
  width: 30%;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
`;

const SnsLoginwrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const SnsButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1.5px solid ${(props) => props.theme.colorTheme.textPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function SignIn() {
  return (
    <Wapper>
      <LoginContainer>
        <TitleBox>
          <Title>Pre-Programming</Title>
          <SubTitle>: What to do before you studying programming!</SubTitle>
        </TitleBox>
        <Text>Phone</Text>
        <Line />
        <PhoneBox>
          <Text>Phone number</Text>
          <InputBox>
            <PostInput>
              <Text>+82</Text>
            </PostInput>
            <Input placeholder="01012345678" />
          </InputBox>
        </PhoneBox>
        <Button>Login</Button>
        <TextLineBox>
          <TextInLine>or enter with</TextInLine>
        </TextLineBox>
        <SnsLoginwrapper>
          <SnsButton>
            <TwitterSvg isCircle={false} fillColor="#03a9f4" />
          </SnsButton>
          <SnsButton>
            <FacebookSvg isCircle={false} fillColor="#03a9f4" height="30" />
          </SnsButton>
        </SnsLoginwrapper>
      </LoginContainer>
    </Wapper>
  );
}