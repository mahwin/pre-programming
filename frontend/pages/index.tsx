import Nav from "@components/Commons/Nav";
import Banner from "@components/Commons/Banner";
import Vocas from "@components/Home/Vocas";
import Footer from "@components/Commons/Footer";
import axios from "axios";

interface ITitles {
  vocas: {
    title: string;
    ok: boolean;
    amount: string;
    install: string;
  }[];
}

const Home = ({ vocas }: ITitles) => {
  return (
    <>
      <Nav />
      <Banner />
      <Vocas data={vocas} />
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const propsObj = { props: { vocas: [] } };
  try {
    //  TODO : rest.js에서 처리할 수 있게 옮겨줘야함.
    // const res = await axios(process.env.API_HOST/vocas);
    const res = await axios.get("http://localhost:3000/api/vocas");
    if (res.status === 200) {
      propsObj.props.vocas = res.data.frontEnd;
      return propsObj;
    } else return propsObj;
  } catch (e) {
    console.warn(e);
    return propsObj;
  }
}
