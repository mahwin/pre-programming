import { Header } from "@components/Commons/Header";
import Banner from "@components/Commons/Banner";
import Vocas from "@components/Home/Vocas";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@components/Commons/Footer"), {
  loading: () => <p>loading...</p>,
});

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Vocas />
      <Footer />
    </>
  );
};

export default Home;
