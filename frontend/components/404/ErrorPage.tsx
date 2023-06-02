import Image from "next/image";
import styled from "styled-components";
import { CursorAnimate } from "../../assets/keyframes/RootKeyFrame";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 20vh;
  margin-bottom: 20vh;
`;

const ContentsWrapper = styled.section`
  display: flex;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: white;
`;

const TextBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    width: 235px;
    font-weight: ${(props) => props.theme.fontWeight.xxbold};
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #888;
  font-weight: bold;
  font-size: 24px;
`;

const Error = styled.h3`
  color: #888;
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: ${CursorAnimate} 0.5s alternate infinite;
`;

export default function ErrorPage() {
  return (
    <Wrapper>
      <ContentsWrapper>
        <figure>
          <Image
            src="/404.png"
            width={400}
            height={500}
            alt="에러 페이지입니다."
          />
        </figure>
        <TextBox>
          <Title>
            <strong>원하는 페이지를 찾을 수 없습니다.</strong>
          </Title>
          <Error>Error 404</Error>
        </TextBox>
      </ContentsWrapper>
    </Wrapper>
  );
}
