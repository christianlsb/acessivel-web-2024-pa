import { Footer, Header } from "../components/";
import Head from "next/head";
import {
  FormSection,
  HomeSection,
} from "@/sections";

export default function Home() {
  console.log(process.env.DATABASE_URL, "teste");

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
      <Header pathname="/" />
      <main>
        <HomeSection />
        {/* <CampaignsSection />
        <OrganizationsSection /> */}
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
