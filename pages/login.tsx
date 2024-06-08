import st from "@/styles/Register.module.css";
import Image from "next/image";
import dog from "@/assets/img/jpg/dog.jpg";
import cn from "classnames";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Header } from "../components";

export default function Teste() {
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
      <Header />
      <div className={st.container}>
        <div className={cn(st.content)}>
          <div className={st.contentImg}>
            <Image
              src={dog}
              width={692}
              height={610}
              alt="Imagem do cachorro"
            />
          </div>
          <div className={st.containerForm}>
            <div className={st.contentForm}>
              <h1>Cadastro</h1>
              <p>O portal que te escuta! Estamos aqui por você.</p>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="">Nome</label>
                  <input type="text" />
                </div>
                <div className={st.field}>
                  <label htmlFor="">Sobrenome</label>
                  <input type="text" />
                </div>
              </div>
              <div className={st.fields}>
                <div className={cn(st.field, st.fieldEmail)}>
                  <label htmlFor="">Email</label>
                  <input className={st.email} type="text" />
                </div>
              </div>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="">CPF</label>
                  <input type="text" />
                </div>
                <div className={st.field}>
                  <label htmlFor="">Data de nascimento</label>
                  <input type="text" />
                </div>
              </div>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="">Senha</label>
                  <input type="text" />
                </div>
                <div className={st.field}>
                  <label htmlFor="">Confirmar senha</label>
                  <input type="text" />
                </div>
              </div>
              <Button className="bg-primaryBlue w-[320px] mx-auto block  rounded-3xl">
                Cadastre-se
              </Button>
              <p>Já faz parte? Clique aqui e acesse a sua conta!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
