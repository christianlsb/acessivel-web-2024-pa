import Head from "next/head";
import { Sidebar } from "@/components/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          property="og:image"
          content="assets/img/png/here-is-world-4k-61-1920x1080.jpg"
        />
        <meta name="description" content="Acessibilidade para todos" />
      </Head>
      <div className="container-dashboard">
        <Sidebar />
        <h1>Home</h1>
      </div>
    </>
  );
}
