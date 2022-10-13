import Nav from "@components/Commons/Nav";
import Banner from "@components/Commons/Banner";
import Vocas from "@components/Vocas/Vocas";
import Footer from "@components/Commons/Footer";
import FloatingButton from "@components/Commons/FloatingButton";

interface IHome {
  data: {
    frontEnd: string[];
    backEnd: string[];
  };
}
const Home = ({ data }: IHome) => {
  return (
    <>
      <Nav />
      <FloatingButton text="+" />
      <Banner />
      <Vocas data={data} />
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3001/api/vocas");
  const jsonData = await res.json();
  return {
    props: {
      data: jsonData.data,
    },
  };
}
