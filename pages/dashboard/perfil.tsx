import Head from "next/head";
import {
  AddressForm,
  ContainerDashboard,
  ProfileForm,
  Sidebar,
  Tabs,
} from "@/components/index";
import { GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
      title: (
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full h-full">Vincular CadPCD</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Vincule seu CadPCD</DialogTitle>
              <DialogDescription>
                Vincule seu CadPCD e tenha acesso de todo o nosso sistema
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="gridProject flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <input type="number" placeholder="000.000.000" />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button>Vincular</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
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
