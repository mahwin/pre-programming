import { ErrorComponent } from "@components/Error/ErrorComponent";

export const NotFoundError = () => {
  const message = {
    title: "페이지 경로가 잘못 되었습니다!",
    text: "Not Found",
  };
  const imgSrc = "/not-found-error.png";
  const buttonText = "홈으로 이동";
  return <ErrorComponent {...{ message, imgSrc, buttonText }} />;
};
