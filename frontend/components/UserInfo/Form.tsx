import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MouseEvent, useMemo, useState } from "react";
import { SmileSvg, FrownSvg } from "../../assets/svg/RootSvg";

const Container = styled.div`
  padding: 60px 14px 24px 14px;
  height: 100%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: white;
`;

const FormContainer = styled.div``;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border-radius: 5px;
    border: 1px solid #ced4da;
    margin: 10px 0 10px 0;
    height: 40px;
    padding: 8px 12px;
    color: #212529;
    font-size: 24px;
    :disabled {
      background-color: #dadcdc;
    }
  }
  label {
    color: #636e72;
    font-weight: 400;
  }
  :nth-child(1) {
    margin-bottom: 10px;
  }
  button {
    height: 30px;
    border-radius: 3px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  p {
    vertical-align: middle;
    text-align: center;
    width: 100%;
  }
`;

const Btn = styled.button`
  width: 100%;
  height: 40px;
  background-color: rgb(0, 206, 201);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  :enabled:hover {
    background-color: rgb(0, 180, 180);
  }
  :disabled {
    cursor: not-allowed;
  }
`;

const SvgBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitBtn = styled(Btn)`
  border-radius: 5px;
  margin-top: 10px;
`;

const Error = styled.span`
  margin-left: 20px;
  color: #ff7675;
  font-size: 12px;
  font-weight: ${(props) => props.theme.fontWeight.base};
`;

interface changeUserInfoForm {
  name?: string;
  phone?: string;
}

interface IForm {
  data: {
    phone: string;
    name: string;
  };
  isCan: boolean;
}

interface IConfirm {
  name: boolean | null;
  phone: boolean | null;
}

export default function Form({ data, isCan }: IForm) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<changeUserInfoForm>({
    defaultValues: useMemo(() => {
      return { ...data };
    }, [data]),
  });

  const [confirm, setConfirm] = useState({ name: false, phone: false });

  const onDupliCheck = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as "phone" | "name";
    if (errors?.name) return;
    if (watch()[name] === data[name]) {
      setError(name, {
        type: "notChange",
        message: "바꾸기 전과 동일합니다.",
      });
    }

    //데이터 통신
  };
  const onValid = (validForm: changeUserInfoForm) => {};
  return (
    <Container
      style={{ backgroundColor: isCan ? "white" : "rgba(200,200,200,1)" }}
    >
      <FormContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <InputBox>
            <label>
              닉네임
              <Error>{errors.name?.message}</Error>
            </label>
            <input
              type="text"
              disabled={!isCan}
              required
              {...register("name", {
                required: "닉네임을 입력해주세요.",
                minLength: {
                  value: 3,
                  message: "닉네임은 3자 이상입니다.",
                },
                maxLength: {
                  value: 11,
                  message: "닉네임은 10자 이하입니다.",
                },
                pattern: {
                  value: /^[A-z가-핳0-9]*$/,
                  message: "닉네임은 한글, 영어, 숫자만 가능합니다.",
                },
              })}
            />
            <BtnBox>
              <SvgBox>
                {errors?.phone ? (
                  <FrownSvg width="30" height="30" color="red" />
                ) : (
                  <SmileSvg width="30" height="30" color="green" />
                )}
              </SvgBox>
              <Btn
                type="button"
                disabled={!isCan}
                onClick={onDupliCheck}
                name="name"
              >
                Confirm
              </Btn>
            </BtnBox>
          </InputBox>
          <InputBox>
            <label>
              폰 번호
              <Error>{errors.phone?.message}</Error>
            </label>
            <input
              type="number"
              disabled={!isCan}
              required
              {...register("phone", {
                required: "phone number는 필수입력 항목입니다.",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "숫자만 입력 가능합니다.",
                },
                minLength: {
                  value: 11,
                  message: "01012345678 형식입니다.",
                },
                maxLength: {
                  value: 11,
                  message: "01012345678 형식입니다.",
                },
              })}
            />
            <BtnBox>
              <SvgBox>
                {errors?.phone ? (
                  <FrownSvg width="30" height="30" color="red" />
                ) : (
                  <SmileSvg width="30" height="30" color="green" />
                )}
              </SvgBox>
              <Btn
                type="button"
                disabled={!isCan}
                name="phone"
                onClick={onDupliCheck}
              >
                Confirm
              </Btn>
            </BtnBox>
          </InputBox>
          <SubmitBtn disabled={!isCan}>Update profile</SubmitBtn>
        </form>
      </FormContainer>
    </Container>
  );
}
