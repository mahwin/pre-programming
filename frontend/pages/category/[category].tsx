import { Header } from "@components/Commons/Header";
import Footer from "@components/Commons/Footer";

import Banner from "@components/Commons/Banner";
import { useClassifiedVocabulary } from "@hooks/useClassifedVocabulary";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageLoading from "@components/Commons/PageLoading";
import { isNil } from "@utils/typeGuard/isNil";

import { Category } from "@components/Category";
import { CATEGORIES, CategoriesType } from "@type/commons/categories";

export default function VocaPage() {
  const router = useRouter();

  const category = router.query.category as CategoriesType;

  useEffect(
    function checkUrl() {
      if (isNil(category)) return;
      if (!CATEGORIES.includes(category)) {
        router.push("/404");
      }
    },
    [category]
  );

  const { data: classifiedVocabulary } = useClassifiedVocabulary();

  if (isNil(classifiedVocabulary))
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
        {...{ category, levelledVocabulary: classifiedVocabulary[category] }}
      />
      <Footer />
    </>
  );
}
