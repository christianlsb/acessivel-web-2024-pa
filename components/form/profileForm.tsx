import st from "@/styles/Register.module.css";
import { Button } from "../ui/button";
import { useState } from "react";
import cn from "classnames";

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);

  return (
    <form className="p-10 bg-white rounded-2xl">
      <h2 className={"text-center text-2xl pb-10"}>Dados pessoais</h2>
      <div className="flex gap-5">
        {/* Nome */}
        <div className={st.field}>
          <label htmlFor="nome">Nome</label>
          <span className={st.fieldValidation}></span>
          <input id="nome" type="text" />
        </div>
        {/* Sobrenome */}
        <div className={st.field}>
          <label htmlFor="sobrenome">Sobrenome</label>
          <span className={st.fieldValidation}></span>
          <input type="text" id="sobrenome" />
        </div>
      </div>
      <div className={st.fields}>
        {/* Email */}
        <div className={cn(st.field, st.fieldEmail)}>
          <label htmlFor="email">Email</label>
          <span className={st.fieldValidation}></span>
          <input id="email" className={st.email} type="text" />
        </div>
      </div>
      <div className="flex gap-5">
        {/* CPF */}
        <div className={st.field}>
          <label htmlFor="cpf">CPF</label>
          <span className={st.fieldValidation}></span>
          <input id="cpf" type="text" />
        </div>
        {/* Data Nascimento */}
        <div className={st.field}>
          <label htmlFor="data_nascimento">Data de nascimento</label>
          <span className={st.fieldValidation}></span>
          <input id="data_nascimento" type="text" />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
