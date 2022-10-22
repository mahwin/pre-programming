import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import VocaDetail from "@components/voca/VocaDetail";
import Banner from "@components/Commons/Banner";
import TestButton from "@components/voca/TestButton";

import { useEffect } from "react";
import { VocaArray } from "../../redux/vocas/vocas.dto";
import wrapper from "../../redux/store";
import { vocasActions } from "redux/vocas/vocasSlice";
import { GetServerSideProps } from "next";
import axios from "axios";
import camelCaser from "@utils/camelCaser";

interface IVocaItem {
  word: string;
  mean: string;
  frequency: string;
}

interface IVoca {
  [key: string]: IVocaItem[];
}

interface IVocaDetail {
  voca: IVoca;
  category: string;
}

export default function VocaPage({ voca, category }: IVocaDetail) {
  console.log(voca);
  return (
    <>
      <Nav />
      <Banner />
      <VocaDetail voca={voca} category={category} />
      <TestButton voca={voca} />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  //@ts-ignore
  wrapper.getServerSideProps((store) => async ({ params: { voca } }: any) => {
    if (!VocaArray.includes(voca)) {
      return {
        // redirect: { permanent: false, destination: "/404" },
        props: {},
      };
    }
    const camelCasedName = camelCaser(voca);

    const data = await (
      await axios.get(`${process.env.API_HOST}/vocas/${camelCasedName}`)
    ).data;
    //데이터 통신이 정상이면 vocas 페이지 보여주고
    if (data.ok) {
      store.dispatch(vocasActions.getVoca({ data: data.data, category: voca }));
      return {
        props: { voca: data.data, category: voca },
      };
    }

    //데이터 동신에 이상이 있으면 홈페이지로
    return {
      // redirect: { permanent: false, destination: "." },
      props: {},
    };
  });
