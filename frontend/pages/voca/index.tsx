import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import VocaDetail from "@components/Vocas/VocaDetail";
import Banner from "@components/Commons/Banner";
import TestButton from "@components/Vocas/TestButton";

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
