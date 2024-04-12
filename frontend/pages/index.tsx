import Nav from "@components/Commons/Header";
import Banner from "@components/Commons/Banner";
import Vocas from "@components/Home/Vocas";
import { api } from "@api/index";

import { TitleInfo } from "@type/commons/title";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Footer = dynamic(() => import("@components/Commons/Footer"), {
  loading: () => <p>loading...</p>,
});

const Home = () => {
  const [vocasInfo, setVocasInfo] = useState<TitleInfo>({});
  useEffect(() => {
    try {
      api.get(`/title/all`).then((res) => {
        setVocasInfo({ ...res.data });
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Nav />
      <Banner />
      {vocasInfo && <Vocas {...{ vocasInfo }} />}
      <Footer />
    </>
  );
};

export default Home;
