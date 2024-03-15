import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import Vocas from "@components/Vocas/Vocas";
import Banner from "@components/Commons/Banner";
import QuizButton from "@components/Vocas/QuizButton";
import formatter from "@utils/camelCaser";
import { useEffect, useState } from "react";
import { vocasActions } from "@redux/vocas/vocasSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import PageLoading from "@components/Commons/PageLoading";
import { titlesType, titles } from "@type/commons/title";
import { isNil } from "@utils/typeGuard/isNil";
import { IState } from "@redux/initialState";
import { IVocaObj } from "@type/commons/voca";

export default function VocaPage() {
  const { data } = useSelector(({ vocas }: IState) => vocas);

  const [vocas, setVocas] = useState<IVocaObj | null>(null);

  const router = useRouter();
  const title = router.query.voca as titlesType;

  useEffect(() => {
    if (!titles.includes(formatter(title))) {
      router.push("/404");
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isNil(data)) {
      vocasActions.getVocas();
      return;
    }
    setVocas(data.category[formatter(title) as titlesType].level);
  }, [data, dispatch]);

  return (
    <>
      <Nav />
      <Banner />
      {vocas && title ? (
        <>
          <Vocas voca={vocas} title={title as titlesType} />
          <QuizButton quizData={vocas} />
        </>
      ) : (
        <PageLoading />
      )}
      <Footer />
    </>
  );
}
