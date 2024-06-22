import st from "@/styles/Register.module.css";
import { Button } from "./ui/button";
import { useState } from "react";
import cn from "classnames";

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);

  return (
    <form>
      <div className={st.fields}>
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
      <div className={st.fields}>
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
      <div className={st.fields}>
        {/* Senha */}
        <div className={st.field}>
          <label htmlFor="senha">Senha</label>
          <span className={st.fieldValidation}></span>
          <input id="senha" type="password" />
        </div>
        {/* Confirmar Senha */}
        <div className={st.field}>
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <span className={st.fieldValidation}></span>
          <input id="confirmPassword" type="password" />
        </div>
      </div>
      <Button
        disabled={loading}
        className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl"
      >
        {loading ? "Carregando..." : "Cadastrar"}
      </Button>
    </form>
  );
};

export default ProfileForm;
