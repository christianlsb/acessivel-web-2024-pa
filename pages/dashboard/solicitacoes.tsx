import Head from "next/head";
import {
  Sidebar,
  Tabs,
  ContainerDashboard,
  ProfileForm,
  AddressForm,
  QueixaForm,
} from "@/components/index";
import { GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";
import NecessidadeForm from "@/components/form/necessidadeForm";

export default function Solicit() {
  const tabs = [
    {
      title: "Cadastrar queixa",
      content: <QueixaForm />,
    },
    {
      title: "Cadastrar necessidade",
      content: <NecessidadeForm />,
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
        <ContainerDashboard title="Solicitações">
          <Tabs tabs={tabs} />
        </ContainerDashboard>
      </div>
    </>
  );
}

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { req } = context;
//   const token = req.cookies.token;
//
//   if (!token) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//
//   try {
//     jwt.verify(token, process.env.JWT_SECRET ?? "");
//     return {
//       props: {},
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
// };
