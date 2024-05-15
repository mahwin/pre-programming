import { Header } from "@components/Commons/Header";
import Footer from "@components/Commons/Footer";
import { UserVocabulary } from "@components/UserVocabulary";
import { CategoryItems } from "@type/commons/categories";

function UserVocaPage() {
  return (
    <>
      <Header />
      <UserVocabulary />
      <Footer />
    </>
  );
}

export default UserVocaPage;
