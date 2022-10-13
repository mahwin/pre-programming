import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import VocaDetail from "@components/voca/VocaDetail";
import Banner from "@components/Commons/Banner";
import TestButton from "@components/voca/TestButton";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";

interface IVocaDetail {
  data: number[];
  voca: string;
  testData: ITestData[];
  tableData: {
    word: string;
    correct: string;
  }[];
}

interface ITestData {
  word: string;
  correct: string;
  example: string;
  exampl1: string;
  exampl2: string;
}

export default function VocaPage(props: IVocaDetail) {
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
  }, []);
  return (
    <>
      <Nav />
      <Banner />
      <VocaDetail {...props} />
      <TestButton testData={[...props.testData]} />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query: { voca } }: any) {
  // const vocas = await (await fetch("http://localhost:3001/api/vocas")).json();
  const vocas = [
    "HTML",
    "CSS",
    "Java script",
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Preact",
    "Express",
    "Gatsby",
    "Nuxt",
    "Nest",
    "Strapi",
    "Fastify",
    "SvelteKit",
  ];
  if (!vocas.includes(voca))
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  const res = await fetch("http:localhost:3001/api/test");
  const jsonData = await res.json();
  const testData = jsonData.data;
  const tableData = jsonData.tableData;
  return {
    props: {
      voca: voca.slice(0, 1).toUpperCase() + voca.slice(1),
      data: [1, 2, 3, 4, 5, 6],
      testData: [...testData],
      tableData,
    },
  };
}
