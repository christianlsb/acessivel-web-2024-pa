import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Error404 from "@/components/error404";
import logo from "../assets/img/png/desktop/+Acessível.png";

export default function NotFound() {
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
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href={"/"}>
          <Image src={logo} width={137} height={25} alt="logo +Acessivel" />
        </Link>
      </header>
      <main>
        <Error404/>
      </main>
    </>
  );
}
