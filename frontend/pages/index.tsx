import type { NextPage } from "next";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Voca from "../components/Voca";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <FloatingButton text="+" />
      <Banner />
      <Voca />
      <Footer />
    </>
  );
};

export default Home;
