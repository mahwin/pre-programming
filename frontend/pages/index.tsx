import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Vocas from "../components/Vocas";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

interface IHome {
  data: {
    frontEnd: string[];
    backEnd: string[];
  };
}

const Home = ({ data }: IHome) => {
  console.log(data, "data");
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
  const res = await fetch("http:localhost:3001/api/vocas");
  const jsonData = await res.json();
  return {
    props: {
      data: jsonData.data,
    },
  };
}
