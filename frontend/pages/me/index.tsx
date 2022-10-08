import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import UserInfo from "../../components/UserInfo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Me() {
  const { loading, data, error } = useSelector(
    (state: any) => state.userReducer
  );
  const router = useRouter();
  useEffect(() => {
    if (error) router.push("enter");
  }, [loading, error]);
  return (
    <>
      <Nav />
      <UserInfo data={data} />
      <Footer />
    </>
  );
}
