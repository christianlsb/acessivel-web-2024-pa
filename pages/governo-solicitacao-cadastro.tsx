import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import logo from "@/assets/img/png/desktop/+Acessível.png";
import Image from "next/image";

export default function GovernoSolicitacaoCadastro() {
  return (
    <div className="container mx-auto text-center h-[100vh] w-full flex flex-col items-center justify-center gap-5">
      <Link href={"/"}>
        <Image src={logo} width={137} height={25} alt="logo +Acessivel" />
      </Link>
      <h1>Conta solicitada com sucesso!</h1>
      <p>
        Em breve você receberá um e-mail com as instruções para ativar sua
        conta.
      </p>
      <Button className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl">
        <Link href={"/"}>Voltar para a página inicial</Link>
      </Button>
    </div>
  );
}
