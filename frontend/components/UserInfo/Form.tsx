import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MouseEvent, useMemo } from "react";
import { SmileSvg, FrownSvg, LoadingSvg } from "@svg";

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
    margin-left: 5px;
    border-radius: 3px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const Changables = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Changable = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  span {
    display: flexbox;
    height: 40px;
    align-items: center;
  }
`;

const Smile = styled(SmileSvg).attrs({
  width: "30",
  height: "30",
  color: "green",
})``;

const Frown = styled(FrownSvg).attrs({
  width: "30",
  height: "30",
  color: "green",
})``;

interface IForm {
  data: {
    phone: string;
    name: string;
  };
  isAvatarChange: boolean;
  isCan: boolean;
}

interface IConfirm {
  name: boolean;
  phone: boolean;
  avatar: boolean;
}

export default function Form({ data, isCan, isAvatarChange }: IForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: useMemo(() => {
      return { name: data.name };
    }, [data.name]),
  });

  const {
    register: phoneResigter,
    handleSubmit: phoneSubmit,
    formState: { errors: phoneErorrs },
  } = useForm<{ phone: string }>({
    defaultValues: useMemo(() => {
      return { phone: data.phone };
    }, [data.phone]),
  });
  const onValid = (validForm: any) => {};
  return (
    <Container
      style={{ backgroundColor: isCan ? "white" : "rgba(200,200,200,1)" }}
    >
      <FormContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <InputBox>
            <label>
              닉네임
              <Error>{errors?.name?.message}</Error>
            </label>
            <Row>
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
                  validate: (text) =>
                    text === data.name ? "변경 사항이 없습니다." : undefined,
                })}
              />
              <Btn disabled={!isCan} name="name">
                Confirm
              </Btn>
            </Row>
          </InputBox>
        </form>
        <form onSubmit={phoneSubmit(() => {})}>
          <InputBox>
            <label>
              폰 번호
              <Error>{phoneErorrs.phone?.message}</Error>
            </label>
            <Row>
              <input
                type="number"
                disabled={!isCan}
                required
                {...phoneResigter("phone", {
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
                  validate: (phone) =>
                    phone === data.phone ? "변경 사항이 없습니다." : undefined,
                })}
              />

              <Btn disabled={!isCan} name="phone">
                Confirm
              </Btn>
            </Row>
          </InputBox>
          <Changables>
            <Changable>
              <span>avatar</span>
              {isAvatarChange ? <Smile /> : <Frown />}
            </Changable>
            <Changable>
              <span>name</span>
              <LoadingSvg />
              {/* {isAvatarChange ? <Smile /> : <Frown />} */}
            </Changable>
            <Changable>
              <span>phone</span>
              {isAvatarChange ? <Smile /> : <Frown />}
            </Changable>
          </Changables>
          <SubmitBtn disabled={!isCan}>Update profile</SubmitBtn>
        </form>
      </FormContainer>
    </Container>
  );
}

{
  /* <SvgBox>
{errors?.phone ? (
  <FrownSvg width="30" height="30" color="red" />
) : (
  <SmileSvg width="30" height="30" color="green" />
)}
</SvgBox> */
}
