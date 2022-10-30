import Nav from "@components/Commons/Nav";
import Banner from "@components/Commons/Banner";
import Vocas from "@components/Home/Vocas";
import Footer from "@components/Commons/Footer";

interface IHome {
  data: {
    Frontend: { title: string; ok: boolean; amount: string; install: string }[];
  };
}
const Home = ({ data }: IHome) => {
  return (
    <>
      <Nav />
      <Banner />
      <Vocas data={data} />
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_API_HOST}/api/vocas`);
  const jsonData = await res.json();
  return {
    props: {
      data: jsonData.data,
    },
  };
}
