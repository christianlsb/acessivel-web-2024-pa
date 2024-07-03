import Head from "next/head";
import {
  Sidebar,
  Grafico,
  ContainerDashboard,
  QueixasGovernoAll,
  Tabs,
  NecessidadesGovernoAll,
} from "@/components/index";
import { GetServerSidePropsContext } from "next";

export default function Relatorios() {
  const tabs = [
    {
      title: "Queixas",
      content: <QueixasGovernoAll />,
    },
    {
      title: "Necessidades",
      content: <NecessidadesGovernoAll />,
    },
  ];

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
        <ContainerDashboard title="Relatórios">
          <Tabs tabs={tabs} />
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
