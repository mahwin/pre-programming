import styled from "styled-components";
import { TwitterSvg, FacebookSvg, LoadingSvg } from "@svg";
import useMutation from "@utils/useMutation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import { SignInColors } from "@color/SignInColors";
import {
  IForm,
  TokenForm,
  TokenConfirmResponse,
  PhoneConfirmResponse,
} from "@type/signIn";
import { isNil } from "@utils/typeGuard";
import { authManager } from "@utils/Auth";

export default function SignIn() {
  //phone 입력과 서버 연결
  const [enter, { loading, data, error }] =
    useMutation<PhoneConfirmResponse>("/auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const onValid = (validForm: IForm) => {
    enter(validForm);
  };

  //인증 번호 입력과 서버 연결
  const [confirmToken, { loading: tokenLoading, data: tokenValidateResponse }] =
    useMutation<TokenConfirmResponse>("/auth/confirm");

  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();

  const onTokenValid = (validForm: TokenForm) => {
    confirmToken(validForm);
  };

  const router = useRouter();

  useEffect(() => {
    if (isNil(tokenValidateResponse)) return;
    if (!tokenValidateResponse.ok) return;

    authManager.set(tokenValidateResponse.accessToken);
    router.push("/");
  }, [tokenValidateResponse, router]);

  const notYetClick = useCallback(() => {
    alert("준비 중입니다!");
  }, []);

  return (
    <Wrapper>
      <LoginContainer>
        <TitleBox>
          <Title>Pre-Programming</Title>
          <SubTitle>: What to do before you studying programming!</SubTitle>
        </TitleBox>

        <Text>Phone</Text>
        <Line />
        <FormBox>
          {data?.ok ? (
            <>
              <Left>Cerification Number</Left>
              <form id="token" onSubmit={tokenHandleSubmit(onTokenValid)}>
                <TokenInput
                  placeholder="인증 번호를 입력하세요."
                  {...tokenRegister("token", {
                    required: "인증 번호는 필수입력 항목입니다.",
                  })}
                />
                {}
                <Error>
                  {tokenValidateResponse?.ok === false &&
                    tokenValidateResponse.message}
                </Error>
                <SubmitButton>인증번호 입력</SubmitButton>
              </form>
            </>
          ) : (
            <>
              <Left>Phone Number</Left>
              <form id="phone" onSubmit={handleSubmit(onValid)}>
                <InputBox>
                  <PreNumber>
                    <Text>+82</Text>
                  </PreNumber>
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
                  />
                </InputBox>
                <Error>{errors?.phone?.message}</Error>
                <SubmitButton>
                  {loading ? (
                    <LoadingSvg color={SignInColors.snsBgColor} />
                  ) : (
                    "Login"
                  )}
                </SubmitButton>
              </form>
            </>
          )}
        </FormBox>

        <SnsBox>
          <TextInLine>or enter with</TextInLine>
          <SvgBox>
            <SnsButton onClick={notYetClick}>
              <TwitterSvg
                isCircle={false}
                fillColor={SignInColors.snsBgColor}
              />
            </SnsButton>
            <SnsButton onClick={notYetClick}>
              <FacebookSvg
                isCircle={false}
                fillColor={SignInColors.snsBgColor}
                height="30"
              />
            </SnsButton>
          </SvgBox>
        </SnsBox>
      </LoginContainer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.section`
  border: 2px solid ${(props) => props.theme.colorTheme.textPrimary};
  border-radius: 10px;
  padding: 24px 36px;

  min-width: ${(props) => props.theme.windowSize.mobile};
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;
const TitleBox = styled.header`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  font-size: ${(props) => props.theme.fontSize.xlg};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const SubTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.base};
  color: ${(props) => props.theme.colorTheme.textSecondary};
`;
const Line = styled.hr`
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colorTheme.textPrimary};
`;

const Text = styled.p<React.HTMLAttributes<HTMLParagraphElement>>`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.base};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;

const Left = styled(Text)`
  text-align: left;
`;

const FormBox = styled.section`
  width: 100%;
`;

const InputBox = styled.div`
  margin-top: 10px;
  display: flex;
  height: 40px;
`;

// +82를 의미
const PreNumber = styled.div`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: ${(props) => props.theme.colorTheme.textSecondary};
`;

const Input = styled.input.attrs({
  type: "number",
})<React.HTMLAttributes<HTMLInputElement>>`
  flex-grow: 1;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  border: none;
  font-size: ${(props) => props.theme.fontSize.lg};
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.activePrimary};
  }
`;

const TokenInput = styled(Input)<React.HTMLAttributes<HTMLInputElement>>`
  display: block;
  width: 100%;
  margin-top: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Error = styled.span`
  margin-top: 5px;
  text-align: left;
  position: absolute;
  color: ${SignInColors.errorColor};
  font-weight: ${(props) => props.theme.fontWeight.base};
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  background-color: ${(props) => props.theme.colorTheme.textSecondary};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.base};
  :hover {
    border: 2px solid ${(props) => props.theme.colorTheme.hoverPrimary};
  }
`;

const SnsBox = styled.footer`
  width: 100%;
`;

const TextInLine = styled(Text)`
  display: flex;
  align-items: center;
  text-align: center;

  color: ${(props) => props.theme.colorTheme.textPrimary};

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.colorTheme.textPrimary};
  }

  &::before {
    margin-right: 0.5em;
  }

  &::after {
    margin-left: 0.5em;
  }
`;

const SvgBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const SnsButton = styled.button<React.HTMLAttributes<HTMLButtonElement>>`
  width: 100%;
  border-radius: 5px;
  border: 1.5px solid ${(props) => props.theme.colorTheme.textPrimary};
`;
