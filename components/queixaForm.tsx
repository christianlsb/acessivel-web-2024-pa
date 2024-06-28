import st from "@/styles/Register.module.css";
import { Button } from "./ui/button";
import { useState } from "react";
import cn from "classnames";

const QueixaForm = () => {
  const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
        const response = await fetch("/api/queixas", {
            method: "POST",
            body: data,
        });

        if (response.ok) {
            alert("Queixa enviada com sucesso!");
            form.reset();
        } else {
            alert("Erro ao enviar queixa");
        }
        } catch (error) {
        alert("Erro ao enviar queixa");
        } finally {
        setLoading(false);
        }
    };

  return (
    <form className="p-10 bg-formContainer">
      <div className="flex gap-5">
        {/* Título */}
        <div className={st.field}>
          <label htmlFor="nome">Titulo</label>
          <span className={st.fieldValidation}></span>
          <input id="nome" type="text" />
        </div>
        {/* Local */}
        <div className={st.field}>
          <label htmlFor="sobrenome">Local</label>
          <span className={st.fieldValidation}></span>
          <input type="text" id="sobrenome" />
        </div>
      </div>
      <div className={st.fields}>
        {/* Descrição */}
        <div className={cn(st.field, st.fieldEmail)}>
          <label htmlFor="email">Descrição</label>
          <span className={st.fieldValidation}></span>
          <input id="email" className="h-[112px]" type="text" />
        </div>
      </div>
      <div className={st.fields}>
        {/* Imagem */}
        <div className={cn(st.field, st.fieldEmail)}>
          <label htmlFor="email">Imagem</label>
          <span className={st.fieldValidation}></span>
          <input id="email" className="h-[112px]" type="text" />
        </div>
      </div>
      <Button>Enviar queixa</Button>
    </form>
  );
};

export default QueixaForm;
