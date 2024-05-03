import { Header } from "@components/Commons/Header";
import SignIn from "@components/SignIn/SignIn";
import Footer from "@components/Commons/Footer";
import PublicInfo from "@components/SignIn/PublicInfo";
import { authManager } from "@modules/Auth";

function Enter() {
  authManager.set(null);

  return (
    <>
      <Header />
      <SignIn />
      <PublicInfo />
      <Footer />
    </>
  );
}
export default Enter;
