import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import Vocas from "@components/Vocas/Vocas";
import Banner from "@components/Commons/Banner";
import QuizButton from "@components/Vocas/QuizButton";
import formatter from "@utils/camelCaser";
import { useEffect, useState } from "react";
import { vocasActions } from "redux/vocas/vocasSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import PageLoading from "@components/Commons/PageLoading";
import { categories, categoriesType } from "types/title";

export default function VocaPage() {
  const { loading, data, error } = useSelector((state: any) => {
    return state.vocas;
  });
  const [category, setCategory] = useState<categoriesType | null>(null);
  const [vocas, setVocas] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const category = router.query.voca as categoriesType;
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
        setVocas(data?.category[formatter(category) as categoriesType].level);
      }
    }
  }, [data, category, dispatch]);

  return (
    <>
      <Nav />
      <Banner />
      {vocas && category ? (
        <>
          <Vocas voca={vocas!} category={category as categoriesType} />
          <QuizButton quizData={vocas} />
        </>
      ) : (
        <PageLoading />
      )}
      <Footer />
    </>
  );
}
