import { Header } from "../components/";
import Head from "next/head";
import { Helmet } from "react-helmet";
import {
  CampaignsSection,
  FormSection,
  HomeSection,
  OrganizationsSection,
} from "@/sections";
export default function Home() {
  return (
    <>
      <Head>
        <title>+Acessivel</title>
        <Helmet>
          <meta
            property="og:image"
            content="assets/img/png/here-is-world-4k-61-1920x1080.jpg"
          />
          <meta name="description" content="Acessibilidade para todos" />
        </Helmet>
      </Head>
      <Header />
      <main>
        <HomeSection />
        <CampaignsSection />
        <OrganizationsSection />
        <FormSection />
      </main>
    </>
  );
}
