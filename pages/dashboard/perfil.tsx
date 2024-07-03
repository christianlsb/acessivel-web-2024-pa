import Head from "next/head";
import {
  AddressForm,
  CadpcdForm,
  ContainerDashboard,
  ProfileForm,
  Sidebar,
  Tabs,
} from "@/components/index";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";

export default function Profile() {
  const tabs = [
    {
      title: "Dados pessoais",
      content: <ProfileForm />,
    },
    {
      title: "Endereço",
      content: <AddressForm />,
    },
    {
      title: "Vincular CadPCD",
      content: <CadpcdForm />,
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
        <ContainerDashboard title="Perfil">
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
