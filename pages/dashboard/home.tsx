import Head from "next/head";
import { Sidebar, Navigator, ContainerDashboard } from "@/components/index";
import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

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
        <ContainerDashboard title={"Home"}>
          <Navigator />
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
