import { Header } from "../components/";
import Head from "next/head";
import {
  CampaignsSection,
  HomeSection,
  OrganizationsSection,
} from "@/sections";

export default function Home() {
  return (
    <>
      <Head>
        <title>+Acessivel</title>
        <meta name="description" content="Acessibilidade para todos" />
      </Head>
      <Header />
      <main>
        <HomeSection />
        <CampaignsSection />
        <OrganizationsSection />
      </main>
    </>
  );
}
