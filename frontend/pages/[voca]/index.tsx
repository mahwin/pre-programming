import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import VocaDetail from "../../components/VocaDetail";
import FloatingButton from "../../components/FloatingButton";
import Banner from "../../components/Banner";
import styled from "styled-components";

interface IVocaDetail {
  data: number[];
  voca: string;
}

export default function VocaPage(props: IVocaDetail) {
  return (
    <>
      <Nav />
      <Banner />
      <VocaDetail {...props} />
      <FloatingButton text="+" />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query: { voca } }: any) {
  return {
    props: {
      voca: voca.slice(0, 1).toUpperCase() + voca.slice(1),
      data: [1, 2, 3, 4, 5, 6],
    },
  };
}
