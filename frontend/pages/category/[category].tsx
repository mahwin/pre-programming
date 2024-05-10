import { Header } from "@components/Commons/Header";
import Footer from "@components/Commons/Footer";
import Vocas from "@components/Category/Vocas";
import Banner from "@components/Commons/Banner";
import QuizButton from "@components/Category/QuizButton";
import { camelCaser } from "@utils/stringFormater";
import { useEffect, useState } from "react";
import { vocasActions } from "@redux/vocas/vocasSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import PageLoading from "@components/Commons/PageLoading";
import { TitlesType, TITLES } from "@type/commons/title";
import { isNil } from "@utils/typeGuard/isNil";
import { IState } from "@redux/initialState";

import { Category } from "@components/Category";

export default function VocaPage() {
  const { categorizedVocabulary, loading } = useSelector(
    ({ vocas }: IState) => vocas
  );

  const router = useRouter();
  const title = router.query.voca as TitlesType;

  useEffect(
    function checkUrl() {
      if (isNil(title)) return;
      if (!TITLES.includes(title)) {
        router.push("/404");
      }
    },
    [title]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (isNil(categorizedVocabulary)) {
      vocasActions.getVocas();
      return;
    }
  }, [dispatch]);

  if (isNil(categorizedVocabulary))
    return (
      <>
        <Header />
        <Banner />
        <PageLoading />
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <Banner />
      <Category
        {...{ title, levelledVocabulary: categorizedVocabulary[title]! }}
      />
      {/* <QuizButton quizData={vocas} /> */}
      <Footer />
    </>
  );
}
