import Nav from "@components/Commons/Nav";
import Footer from "@components/Commons/Footer";
import UserVoca from "@components/UserVoca/UserVoca";

interface IProps {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
}

interface IUserVocaProps {
  baseData: IProps[];
}

function UserVocaPage({ baseData }: IUserVocaProps) {
  return (
    <>
      <Nav />
      <UserVoca baseData={baseData} />
      <Footer />
    </>
  );
}

export default UserVocaPage;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_API_HOST}/api/vocas`);
  const jsonData = await res.json();
  return {
    props: {
      baseData: jsonData?.data?.Frontend,
    },
  };
}
