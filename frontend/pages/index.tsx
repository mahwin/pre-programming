import Nav from "@components/Commons/Header";
import Banner from "@components/Commons/Banner";
import Vocas from "@components/Home/Vocas";
import { api } from "@api/index";

import { ITitles } from "@type/commons/title";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@components/Commons/Footer"), {
  loading: () => <p>loading...</p>,
});

const Home = ({ data }: ITitles) => {
  return (
    <>
      <Nav />
      <Banner />
      <Vocas data={data} />
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const res = await api.get(`/title/all`);
    if (res.status === 200) return { props: { data: res.data } };
  } catch (e) {
    console.warn(e);
    return { props: { data: [] } };
  }
}
