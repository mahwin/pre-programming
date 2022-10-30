import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import VocaDetail from "@components/Vocas/VocaDetail";
import Banner from "@components/Commons/Banner";
import TestButton from "@components/Vocas/TestButton";
import camelCaser from "@utils/camelCaser";
import { useEffect, useState } from "react";
import { VocaArray } from "../../redux/vocas/vocas.dto";
import { vocasActions } from "redux/vocas/vocasSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { LoadingSvg } from "@svg";
import PageLoading from "@components/Commons/PageLoading";

const categories = [
  "axios",
  "next",
  "react",
  "styled-components",
  "recoil",
  "react-redux",
  "react-query",
  "react-router",
  "tailwindcss",
  "react-hook-form",
];

type CategoryType =
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
  [key in CategoryType]: string;
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

export default function VocaPage() {
  const { loading, data, error } = useSelector((state: any) => {
    return state.vocas;
  });
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [vocas, setVocas] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const category = router.query.voca as CategoryType;
    if (category) {
      if (!categories.includes(category)) {
        router.push("/404");
      } else {
        setCategory(category);
      }
    }
  }, [router]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(vocasActions.getVocas());
    } else {
      if (category) {
        setVocas(data?.category[camelCaser(category) as CategoryType].level);
      }
    }
  }, [data, category]);

  return (
    <>
      <Nav />
      <Banner />
      {vocas && category ? (
        <>
          <VocaDetail voca={vocas!} category={category as CategoryType} />
          <TestButton testData={vocas} />
        </>
      ) : (
        <PageLoading />
      )}
      <Footer />
    </>
  );
}
