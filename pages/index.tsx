import { Header } from "../components/";
import Head from "next/head";
import { HomeSection } from "@/sections";
export default function Home() {
  return (
    <>
      <Head>
        <title>+Acessivel</title>
      </Head>
      <Header />
      <main>{/* <HomeSection /> */}</main>
    </>
  );
}
