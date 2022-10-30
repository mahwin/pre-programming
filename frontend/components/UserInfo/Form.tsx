import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { SmileSvg, FrownSvg, LoadingSvg } from "@svg";
import useMutation from "@utils/useMutation";
import { useRouter } from "next/router";
import objToTest from "@utils/objToText";

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.span`
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
  height: 60px;
  display: flex;
  flex-direction: column;
  color: #2d3436;
  font-weight: 400;
  span {
    display: flexbox;
    width: 50px;
    align-items: center;
    justify-content: center;
  }
  div {
    display: flex;
    justify-content: center;
    width: 50px;
    height: 30px;
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
  color: "orange",
})``;

interface IForm {
  data: {
    phone: string;
    name: string;
    currentAvatar: string;
  };
  isAvatarChange: boolean;
  isCan: boolean;
}

interface IFormData {
  name?: string;
  phone?: string;
}

interface IConfirm {
  ok: boolean;
  message?: string;
  data: {
    name?: string;
    phone?: string;
  };
}

interface IUpdate {
  name?: string;
  phone?: string;
  avatar?: string;
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
  //name 검증
  const [confirm, { loading, data: confirmName }] =
    useMutation<IConfirm>("/user/confirm");
  //phone 검증
  const [phoneConfirm, { loading: phoneLoading, data: confirmPhone }] =
    useMutation<IConfirm>("/user/confirm");

  const onValid = (validForm: IFormData) => {
    Object.keys(validForm).includes("name")
      ? confirm(validForm)
      : phoneConfirm(validForm);
  };

  //유효하게 바꿀 수 있는 데이터 유무
  const [updateData, setUpdateData] = useState<IUpdate>({});

  useEffect(() => {
    if (confirmName?.ok)
      setUpdateData((prev) => ({ ...prev, ...confirmName.data }));
    if (confirmPhone?.ok)
      setUpdateData((prev) => ({ ...prev, ...confirmPhone.data }));
    if (isAvatarChange)
      setUpdateData((prev) => ({ ...prev, avatar: data.currentAvatar }));
  }, [isAvatarChange, confirmName, confirmPhone]);

  //유효한 데이터 서버로 전송 후 정상적으로 바꼈으면 화면 reload
  const [update, { loading: updateLoading, data: updateResponse }] =
    useMutation<{ ok: boolean }>("/user/update");

  const handleUpdate = () => {
    if (window.confirm(objToTest(updateData))) {
      update(updateData);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (updateResponse?.ok) router.push("/");
  }, [updateResponse]);
  return (
    <Container
      style={{ backgroundColor: isCan ? "white" : "rgba(200,200,200,1)" }}
    >
      <FormContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <InputBox>
            <label>
              닉네임
              <Error style={{ marginLeft: "10px" }}>
                {errors?.name?.message}
              </Error>
            </label>
            <Row>
              <input
                type="text"
                disabled={!isCan}
                spellCheck={false}
                required
                {...register("name", {
                  required: "닉네임을 입력해주세요.",
                  minLength: {
                    value: 3,
                    message: "닉네임은 3자 이상입니다.",
                  },
                  maxLength: {
                    value: 21,
                    message: "닉네임은 20자 이하입니다.",
                  },
                  pattern: {
                    value: /^[a-zA-Z가-힣ㄱ-ㅎ0-9 ]*$/,
                    message: "닉네임은 한글, 영어, 숫자 공백만 가능합니다.",
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
        <form onSubmit={phoneSubmit(onValid)}>
          <InputBox>
            <label>
              폰 번호
              <Error style={{ marginLeft: "10px" }}>
                {phoneErorrs.phone?.message}
              </Error>
            </label>
            <Row>
              <input
                type="number"
                disabled={!isCan}
                spellCheck={false}
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
              <Row>
                <span>avatar</span>
                <div>{isAvatarChange ? <Smile /> : <Frown />}</div>
              </Row>
            </Changable>
            <Changable>
              <Row>
                <span>name</span>
                <div>
                  {confirmName && (
                    <>
                      {loading ? (
                        <LoadingSvg />
                      ) : confirmName?.ok ? (
                        <Smile />
                      ) : (
                        <Frown />
                      )}
                    </>
                  )}
                </div>
              </Row>
              <Error>{confirmName?.message}</Error>
            </Changable>
            <Changable>
              <Row>
                <span>phone</span>
                <div>
                  {confirmPhone && (
                    <>
                      {phoneLoading ? (
                        <LoadingSvg />
                      ) : confirmPhone?.ok ? (
                        <Smile />
                      ) : (
                        <Frown />
                      )}
                    </>
                  )}
                </div>
              </Row>
              <Error>{confirmPhone?.message}</Error>
            </Changable>
          </Changables>
        </form>
        {updateLoading ? (
          <>
            <SubmitBtn disabled>
              <LoadingSvg color="#006266" />
            </SubmitBtn>
          </>
        ) : (
          <>
            {Object.keys(updateData).length !== 0 ? (
              <SubmitBtn onClick={handleUpdate} disabled={!isCan}>
                Update profile
              </SubmitBtn>
            ) : (
              <SubmitBtn disabled>Nothing has changed</SubmitBtn>
            )}
          </>
        )}
      </FormContainer>
    </Container>
  );
}
