import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { SmileSvg, FrownSvg, LoadingSvg } from "@svg";
import useMutation from "@utils/useMutation";
import { useRouter } from "next/router";
import objToTest from "@utils/objToText";
import { userInfoColors } from "@color/userInfoColors";
import { IForm, IConfirm, IProfile } from "@type/userInfo";

const Wrapper = styled.section<React.HTMLAttributes<HTMLElement>>`
  padding: 60px 14px 24px 14px;
  height: 100%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const InputBox = styled.section`
  display: flex;
  flex-direction: column;
  input {
    border-radius: 5px;
    border: 1px solid ${userInfoColors.inputColor.abled};
    margin: 10px 0 10px 0;
    height: 40px;
    padding: 8px 12px;
    color: ${userInfoColors.inputColor.text};
    font-size: ${(props) => props.theme.fontSize.lg};
    :disabled {
      background-color: ${userInfoColors.inputColor.disabled};
    }
  }
  label {
    color: ${userInfoColors.labelColor};
    font-weight: ${(props) => props.theme.fontWeight.base};
  }
  button {
    margin-left: 5px;
    border-radius: 3px;
  }
  :nth-child(1) {
    margin-bottom: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button<
  React.HTMLAttributes<HTMLButtonElement> & { name: string; disabled: boolean }
>`
  width: 100%;
  height: 40px;
  background-color: ${() => userInfoColors.bgColor};
  color: white;
  border: none;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.base};
  :enabled:hover {
    opacity: 0.8;
    transition: ease-in-out 0.3s;
  }
  :disabled {
    cursor: not-allowed;
  }
`;

const SubmitBtn = styled(Btn)<any>`
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.span`
  margin-left: 10px;
  color: ${userInfoColors.errorColor};
  font-size: 12px;
  font-weight: ${(props) => props.theme.fontWeight.base};
`;

const Changable = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ChangableBox = styled.div`
  display: flex;
  align-items: center;
  color: ${userInfoColors.textColor};
  font-weight: ${(props) => props.theme.fontWeight.base};
  span {
    margin-right: 10px;
  }
`;

const Smile = styled(SmileSvg).attrs({
  width: "30",
  height: "30",
  color: userInfoColors.svg.smile,
})``;

const Frown = styled(FrownSvg).attrs({
  width: "30",
  height: "30",
  color: userInfoColors.svg.frown,
})``;

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

  const onValid = (validForm: IProfile) => {
    Object.keys(validForm).includes("name")
      ? confirm(validForm)
      : phoneConfirm(validForm);
  };

  //유효하게 바꿀 수 있는 데이터 유무
  const [updateData, setUpdateData] = useState<IProfile>({});

  useEffect(() => {
    if (confirmName?.ok)
      setUpdateData((prev) => ({ ...prev, ...confirmName.data }));
    if (confirmPhone?.ok)
      setUpdateData((prev) => ({ ...prev, ...confirmPhone.data }));
    if (isAvatarChange)
      setUpdateData((prev) => ({ ...prev, avatar: data.currentAvatar }));
  }, [isAvatarChange, confirmName, confirmPhone, data.currentAvatar]);

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
  }, [updateResponse, router]);
  return (
    <Wrapper
      style={{ backgroundColor: isCan ? "white" : "rgba(200,200,200,1)" }}
    >
      <div>
        <form id="nickname" onSubmit={handleSubmit(onValid)}>
          <InputBox>
            <label>
              닉네임
              <Error>{errors?.name?.message}</Error>
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
              <Btn name="name" disabled={!isCan}>
                Confirm
              </Btn>
            </Row>
          </InputBox>
        </form>
        <form id="phone" onSubmit={phoneSubmit(onValid)}>
          <InputBox>
            <label>
              폰 번호
              <Error>{phoneErorrs.phone?.message}</Error>
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

              <Btn name="phone" disabled={!isCan}>
                Confirm
              </Btn>
            </Row>
          </InputBox>
          <Changable>
            <ChangableBox>
              <span>avatar</span>
              <div>{isAvatarChange ? <Smile /> : <Frown />}</div>
            </ChangableBox>
            <ChangableBox>
              <span>name</span>
              {confirmName && (
                <div>
                  {loading ? (
                    <LoadingSvg />
                  ) : confirmName?.ok ? (
                    <Smile />
                  ) : (
                    <Frown />
                  )}
                </div>
              )}
              <Error>{confirmName?.message}</Error>
            </ChangableBox>
            <ChangableBox>
              <span>phone</span>
              {confirmPhone && (
                <div>
                  {phoneLoading ? (
                    <LoadingSvg />
                  ) : confirmPhone?.ok ? (
                    <Smile />
                  ) : (
                    <Frown />
                  )}
                </div>
              )}
              <Error>{confirmPhone?.message}</Error>
            </ChangableBox>
          </Changable>
        </form>
        {updateLoading ? (
          <SubmitBtn disabled={true}>
            <LoadingSvg color={userInfoColors.toggle.cicle} />
          </SubmitBtn>
        ) : (
          <>
            {Object.keys(updateData).length !== 0 ? (
              <SubmitBtn onClick={handleUpdate} disabled={!isCan}>
                Update profile
              </SubmitBtn>
            ) : (
              <SubmitBtn disabled={true}>Nothing has changed</SubmitBtn>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
}
