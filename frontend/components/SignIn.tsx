import styled from "styled-components";
import { TwitterSvg, FacebookSvg } from "../assets/svg/RootSvg";
import useMutation from "../libs/useMutation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  border: 1px solid ${(props) => props.theme.colorTheme.textPrimary};
`;

const Text = styled.p`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.base};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const PhoneBox = styled.div`
  width: 100%;
`;
const Form = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
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

const InputBox = styled.div`
  display: flex;
`;
const Input = styled.input.attrs({
  type: "number",
})`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 90%;
  padding: 5px;
  height: 40px;
  border: none;
  font-size: ${(props) => props.theme.fontSize.lg};
  margin-bottom: 5px;
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.activePrimary};
  }
`;
const TokenInput = styled(Input)`
  width: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Error = styled.span`
  color: #ff7675;
  font-weight: ${(props) => props.theme.fontWeight.base};
  position: absolute;
  top: 50px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  border: none;
  margin-top: 30px;
  margin-bottom: 10px;
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
  margin-top: 20px;
  margin-bottom: 25px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colorTheme.textPrimary}; ;
`;

const TextInLine = styled(Text)`
  position: absolute;
  right: 0;
  left: 0;
  top: -12px;
  margin: 0 auto;
  width: 25%;
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

interface EnterForm {
  phone: string;
}
interface IForm {
  phone: string;
  serverError?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
  message?: string;
  accessToken?: string;
}

export default function SignIn() {
  //phone 입력과 서버 연결
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EnterForm>();
  const onValid = (validForm: IForm) => {
    enter(validForm);
  };

  //인증 번호 입력과 서버 연결
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/auth/confirm");
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();
  const onTokenValid = (validForm: TokenForm) => {
    confirmToken(validForm);
  };

  const router = useRouter();
  useEffect(() => {
    if (tokenData?.ok) {
      localStorage.setItem("accessToken", tokenData.accessToken!);
      router.push("/");
    }
  }, [tokenData, router]);

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
          {data?.ok ? (
            <>
              <Text>Cerification Number</Text>
              <Form onSubmit={tokenHandleSubmit(onTokenValid)}>
                <TokenInput
                  placeholder="인증 번호를 입력하세요."
                  {...tokenRegister("token", {
                    required: "인증 번호는 필수입력 항목입니다.",
                  })}
                />

                <Error>{tokenData?.message}</Error>
                <Button>인증번호 입력</Button>
              </Form>
            </>
          ) : (
            <>
              <Text>Phone number</Text>
              <Form onSubmit={handleSubmit(onValid)}>
                <InputBox>
                  <PostInput>
                    <Text>+82</Text>
                  </PostInput>
                  <Input
                    placeholder="01012345678형식의 번호를 입력하세요."
                    {...register("phone", {
                      required: "phone number는 필수입력 항목입니다.",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "숫자만 입력 가능합니다.",
                      },
                      minLength: {
                        value: 11,
                        message: "phone number의 형식은 01012345678입니다.",
                      },
                      maxLength: {
                        value: 11,
                        message: "phone number의 형식은 01012345678입니다.",
                      },
                    })}
                    required
                  />
                </InputBox>

                <Error>{errors?.phone?.message}</Error>
                <Button>{loading ? "Loading..." : "Login"}</Button>
              </Form>
            </>
          )}
        </PhoneBox>
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
