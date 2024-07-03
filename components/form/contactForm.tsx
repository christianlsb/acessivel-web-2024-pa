import st from "@/styles/Register.module.css";
import { Button } from "../ui/button";
import { useState } from "react";
import cn from "classnames";
import { z } from "zod";
import Cookies from "js-cookie";

interface FormProps {
  nome: string,
  mensagem: string
  email: string
}

const ContactForm = () => {
//TODO: pegar dos cookies
  const { name, email } = { name: "Teste", email: "EmailTeste@teste.com" };
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState<FormProps>({
    nome: name,
    email: email,
    mensagem: ""
  });

  const handleSubmit = async (event: any) => {

  };

  return (
      <form onSubmit={handleSubmit} className="p-10 mt-20 bg-white">
        <h2 className={"text-2xl pb-4"}>Nova mensagem</h2>
        <p className={"pb-4"}>Utilize este espaço para conversar com o time +Acessivel.</p>
        <div className="flex flex-col gap-5">
          {/* Mensagem */}
          <div className={st.field}>
            <label className={"pb-4"} htmlFor="mensagem">Mensagem</label>
            <textarea
                className={'resize-none h-[200px]'}
                id="mensagem"
            ></textarea>
          </div>
        </div>
        <div className={"flex mt-12 gap-4"}>
          <Button className={"w-[320px] bg-primaryBlue ml-auto"} type="submit">Enviar</Button>
        </div>
      </form>
  );
};

export default ContactForm;
