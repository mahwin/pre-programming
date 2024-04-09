import Nav from "@components/Commons/Header";
import Footer from "@components/Commons/Footer";
import UserInfo from "@components/UserInfo/UserInfo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageLoading from "@components/Commons/PageLoading";
import { isNil } from "@utils/typeGuard";
import { IState } from "@redux/initialState";

export default function Me() {
  const { loading, data, error } = useSelector(({ user }: IState) => user);

  const router = useRouter();
  useEffect(() => {
    console.log(!loading && error);
    if (!loading && error) {
      router.push("/signIn");
    }
  }, [loading, error, router]);
  return (
    <>
      <Nav />
      {data ? <UserInfo data={data} /> : <PageLoading />}
      <Footer />
    </>
  );
}
