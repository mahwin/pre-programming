import type { NextPage } from "next";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Voca from "../components/Voca";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <Banner />
      <Voca />
    </>
  );
};

export default Home;
