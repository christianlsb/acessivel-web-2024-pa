import Head from "next/head";
import { Sidebar, Header, ContainerDashboard } from "@/components/index";
import { GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Solicit() {
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
        <ContainerDashboard>
          <h1>Solicitações</h1>
          <Tabs defaultValue="account">
            <TabsList className="flex-col">
              <TabsTrigger value="account">Dados pessoais</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="cadpcd">Vincule seu CadPCD</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="max-w-[664px]">
                <div className="flex">
                  <div className="flex flex-col">
                    <label>Nome</label>
                    <input placeholder="Christian" disabled />
                  </div>
                  <div className="flex flex-col">
                    <label>Nome</label>
                    <input placeholder="Lisboa" disabled />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Email</label>
                  <input
                    placeholder="chrislsb@gmail.com"
                    disabled
                    className="w-full"
                    type="text"
                  />
                </div>
                <div className="flex">
                  <div className="flex flex-col">
                    <label>CPF</label>
                    <input placeholder="000.000.000-00" disabled />
                  </div>
                  <div className="flex flex-col">
                    <label>Data de nascimento</label>
                    <input placeholder="27/07/2004" disabled />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col">
                    <label>Senha</label>
                    <input placeholder="**********" disabled />
                  </div>
                  <div className="flex flex-col">
                    <label>Confirmar senha</label>
                    <input placeholder="**********" disabled />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="address">Endereço</TabsContent>
            <TabsContent value="cadpcd">Vincule seu cadpcd</TabsContent>
          </Tabs>
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
    jwt.verify(token, process.env.JWT_SECRET ?? "");
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
