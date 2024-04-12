import Nav from "@components/Commons/Header";
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
import { TitlesType, TITLES } from "@type/commons/title";
import { isNil } from "@utils/typeGuard/isNil";
import { IState } from "@redux/initialState";
import { IVocaObj } from "@type/commons/voca";

export default function VocaPage() {
  const { data } = useSelector(({ vocas }: IState) => vocas);

  const [vocas, setVocas] = useState<IVocaObj | null>(null);

  const router = useRouter();
  const title = router.query.voca as string;

  useEffect(() => {
    if (isNil(title)) return;
    if (!TITLES.includes(formatter(title))) {
      router.push("/404");
    }
  }, [title]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isNil(data)) {
      vocasActions.getVocas();
      return;
    }

    setVocas(data.category[formatter(title) as TitlesType].level);
  }, [data, dispatch]);

  if (isNil(title) || isNil(vocas))
    return (
      <>
        <Nav />
        <Banner />
        <PageLoading />
        <Footer />
      </>
    );

  return (
    <>
      <Nav />
      <Banner />
      <Vocas voca={vocas} title={title as TitlesType} />
      <QuizButton quizData={vocas} />
      <Footer />
    </>
  );
}
