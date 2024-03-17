import Nav from "@components/Commons/Header";
import Banner from "@components/Commons/Banner";
import Vocas from "@components/Home/Vocas";
import axios from "axios";
import PageLoading from "@components/Commons/PageLoading";
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
      {data ? <Vocas data={data} /> : <PageLoading />}
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const propsObj = { props: { data: null } };
  try {
    const API_HOST = process.env.API_HOST;
    const PORT = process.env.PORT;
    const res = await axios.get(`${API_HOST}:${PORT}/title/all`);
    if (res.status === 200) {
      propsObj.props.data = res.data;
      return propsObj;
    } else return propsObj;
  } catch (e) {
    console.warn(e);
    return propsObj;
  }
}
