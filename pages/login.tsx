import Head from "next/head";
import { FormLogin, Header, VectorBlue } from "@/components/index";
import { GetServerSidePropsContext } from "next";

export default function Login() {
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
      <FormLogin />
      {/* <VectorBlue className="absolute bottom-0 right-0" /> */}
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
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
