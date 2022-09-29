import type { NextPage } from "next";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Vocas from "../components/Vocas";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <FloatingButton text="+" />
      <Banner />
      <Vocas />
      <Footer />
    </>
  );
};

export default Home;
