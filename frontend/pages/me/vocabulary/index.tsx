import { Header } from "@components/Commons/Header";
import Footer from "@components/Commons/Footer";
import UserVoca from "@components/UserVocabulary/UserVoca";
import axios from "axios";
import { CategoriesType, CategoryItems } from "@type/commons/categories";

interface Props {
  data: CategoryItems;
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
  const propsObj: { props: { data: null | CategoryItems } } = {
    props: { data: null },
  };
  try {
    const API_HOST = process.env.API_HOST;
    const PORT = process.env.PORT;
    const { status, data } = await axios.get<CategoryItems>(
      `${API_HOST}:${PORT}/categories/all`
    );
    if (status === 200) {
      propsObj.props.data = data;
    }
  } catch (e) {
    console.warn(e);
  } finally {
    return propsObj;
  }
}
