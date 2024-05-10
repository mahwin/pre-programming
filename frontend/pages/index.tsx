import { Header } from "@components/Commons/Header";
import Banner from "@components/Commons/Banner";
import { CategoryList } from "@components/CategoryList";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@components/Commons/Footer"), {
  loading: () => <p>loading...</p>,
});

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <CategoryList />
      <Footer />
    </>
  );
};

export default Home;
