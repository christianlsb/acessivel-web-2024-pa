import Head from "next/head";
import { FormQueixante, Header } from "../components/index";
import { GetServerSidePropsContext } from "next";

export default function Register() {
  return (
    <>
      <Head>
        <title>+Acessivel</title>
        <meta
          property="og:image"
          content="assets/img/png/here-is-world-4k-61-1920x1080.jpg"
        />
        <meta name="description" content="Acessibilidade para todos" />
      </Head>
      <Header />
      <FormQueixante />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const token = req.cookies.token;

  if (token) {
    return {
      redirect: {
        destination: "/dashboard/home",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
