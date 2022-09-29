import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import VocaDetail from "../../components/VocaDetail";
import FloatingButton from "../../components/FloatingButton";
import Banner from "../../components/Banner";

export default function VocaPage() {
  return (
    <>
      <Nav />
      <Banner />
      <VocaDetail />
      <FloatingButton text="+" />
      <Footer />
    </>
  );
}
