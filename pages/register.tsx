import Head from "next/head";
import { FormRegister, Header, VectorBlue } from "../components/";

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
      <FormRegister />
      <VectorBlue className="absolute bottom-0 left-0" />
    </>
  );
}
