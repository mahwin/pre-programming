import Image from "next/image";
import styled from "styled-components";
import { CursorAnimate } from "../../assets/keyframes/RootKeyFrame";
import { useRouter } from "next/router";
import { HtmlHTMLAttributes } from "react";
import { pageRoutes } from "../../apiRouters";

interface Props {
  message: { title: string; text: string };
  buttonText: string;
  imgSrc: string;
}

export function ErrorComponent({ message, buttonText, imgSrc }: Props) {
  const router = useRouter();

  const handleClickNavigateHomeButton = () => {
    router.push(pageRoutes.main);
  };

  return (
    <Wrapper>
      <Col>
        <figure>
          <Image
            src={imgSrc}
            width={400}
            height={500}
            alt="에러 페이지입니다."
          />
        </figure>
        <ContentsBox>
          <Title>
            <strong>{message.title}</strong>
          </Title>
          <ErrorText>{message.text}</ErrorText>
          <Button onClick={handleClickNavigateHomeButton}>{buttonText}</Button>
        </ContentsBox>
      </Col>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  margin: 40px 0px;
`;

const Col = styled.section`
  display: flex;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: white;
`;

const ContentsBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Title = styled.h1`
  color: #888;
  font-weight: bold;
  font-size: 24px;
`;

const ErrorText = styled.h3`
  color: #888;
  width: 250px;
  height: 50px;
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  font-size: 50px;
  display: inline-block;
  animation: ${CursorAnimate} 0.5s alternate infinite;
`;

const Button = styled.button<HtmlHTMLAttributes<HTMLButtonElement>>`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  background-color: #888;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #666;
  }
`;
