import { ErrorComponent } from "@components/Error/ErrorComponent";

export const Error = () => {
  const message = {
    title: "알 수 없는 에러가 발생햇습니다!",
    text: "I don't know what happened",
  };
  const imgSrc = "/error.png";
  const buttonText = "홈으로 이동";
  return <ErrorComponent {...{ message, imgSrc, buttonText }} />;
};
