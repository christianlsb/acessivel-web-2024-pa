import Head from "next/head";
import { FormLogin, Header } from "@/components/index";
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
    </>
  );
}
