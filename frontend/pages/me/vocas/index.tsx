import { Header } from "@components/Commons/Header";
import Footer from "@components/Commons/Footer";
import UserVoca from "@components/UserVoca/UserVoca";
import axios from "axios";
import { TitleItems } from "@type/commons/title";

interface Props {
  data: { web: TitleItems };
}

function UserVocaPage({ data }: Props) {
  return (
    <>
      <Header />
      <UserVoca data={data} />
      <Footer />
    </>
  );
}

export default UserVocaPage;

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
