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

export default function VocaPage() {
  const { loading, data, error } = useSelector((state: any) => {
    return state.vocas;
  });
  const [title, setTitle] = useState<titlesType | null>(null);
  const [vocas, setVocas] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const title = router.query.voca as titlesType;
    if (title) {
      if (!titles.includes(title)) {
        router.push("/404");
      } else {
        setTitle(title);
      }
    }
  }, [router]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(vocasActions.getVocas());
    } else {
      if (title) {
        setVocas(data?.category[formatter(title) as titlesType].level);
      }
    }
  }, [data, title, dispatch]);

  return (
    <>
      <Nav />
      <Banner />
      {vocas && title ? (
        <>
          <Vocas voca={vocas!} title={title as titlesType} />
          <QuizButton quizData={vocas} />
        </>
      ) : (
        <PageLoading />
      )}
      <Footer />
    </>
  );
}
