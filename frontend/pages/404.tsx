import { Header } from "@components/Commons/Header";
import Footer from "@components/Commons/Footer";
import { NotFoundError } from "@components/Error/NotFoundError";

export default function Custom404() {
  return (
    <>
      <Header />
      <NotFoundError />
      <Footer />
    </>
  );
}
