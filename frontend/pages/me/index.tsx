import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import UserInfo from "@components/UserInfo/UserInfo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageLoading from "@components/Commons/PageLoading";

export default function Me() {
  const { loading, data, error } = useSelector((state: any) => {
    state.userReducer;
    return state.user;
  });
  const router = useRouter();
  useEffect(() => {
    if (error && !data) router.push("signIn");
  }, [loading, error, data]);
  console.log(error);
  return (
    <>
      <Nav />
      {data ? <UserInfo data={data} /> : <PageLoading />}
      <Footer />
    </>
  );
}
