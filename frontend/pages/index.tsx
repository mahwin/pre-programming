import type { NextPage } from "next";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Voca from "../components/Voca";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <Banner />
      <Voca />
      <Footer />
    </>
  );
};

export default Home;
