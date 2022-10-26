import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import VocaDetail from "@components/voca/VocaDetail";
import Banner from "@components/Commons/Banner";
import TestButton from "@components/voca/TestButton";
import camelCaser from "@utils/camelCaser";
import { useEffect } from "react";
import { VocaArray } from "../../redux/vocas/vocas.dto";
import { vocasActions } from "redux/vocas/vocasSlice";
import { GetServerSideProps } from "next";
import axios from "axios";

type Category =
  | "axios"
  | "next"
  | "react"
  | "styledComponents"
  | "recoil"
  | "reactRedux"
  | "reactQuery"
  | "reactRouter"
  | "tailwindcss"
  | "reactHookForm";

type CategoryKey = {
  [key in Category]: string;
};
interface IVoca {
  category: {
    [key: string]: {
      level: {
        [key: string]: { mean: string; word: string; frequency: string }[];
      };
    };
  };
}

interface VocaPageProps {
  voca: IVoca;
  category: string;
}

export default function VocaPage({ voca, category }: VocaPageProps) {
  return (
    <>
      <Nav />
      <Banner />
      <VocaDetail voca={voca.category[category].level} category={category} />
      {/* <TestButton voca={pageProps} /> */}
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const voca = params?.voca as string;
  //잘못된 주소 일 경우 404page로 이동
  if (!VocaArray.includes(voca)) {
    return {
      redirect: { permanent: false, destination: "/404" },
      props: {},
    };
  }

  const response = await (
    await axios.get(`${process.env.API_HOST}/vocas/all`)
  ).data;

  if (response.ok) {
    return {
      props: { voca: JSON.parse(response.data), category: camelCaser(voca) },
    };
    //통신 장애시 home으로
  } else {
    return {
      redirect: { permanent: false, destination: "/" },
      props: {},
    };
  }
};
