import Head from "next/head";
import { Sidebar, Navigator, ContainerDashboard } from "@/components/index";
import jwt from "jsonwebtoken";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Cookies from "js-cookie";

export default function Home() {
  const authToken = Cookies.get("auth");
  if (authToken) {
    console.log("Token: ", authToken);
  }

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
        <ContainerDashboard title={"Home"}>
          <Navigator />
        </ContainerDashboard>
      </div>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
