import st from "@/styles/Register.module.css";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import cn from "classnames";
import Cookies from "js-cookie";

const ProfileForm = () => {
  interface Profile {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
  }

  const [getUser, setUser] = useState<Profile>({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    dataNascimento: "",
  });

  const [loading, setLoading] = useState(false);
  const { user } = JSON.parse(Cookies.get("user") || "{}");

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:2424/queixante/get/${user.id_queixante}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter dados do usuário");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <form className="p-10 bg-white rounded-2xl">
      <h2 className={"text-center text-2xl pb-10"}>Dados pessoais</h2>
      <div className="flex gap-5">
        {/* Nome */}
        <div className={st.field}>
          <label htmlFor="nome">Nome</label>
          <span className={st.fieldValidation}></span>
          <input id="nome" type="text" readOnly value={getUser.nome} />
        </div>
        {/* Sobrenome */}
        <div className={st.field}>
          <label htmlFor="sobrenome">Sobrenome</label>
          <span className={st.fieldValidation}></span>
          <input
            type="text"
            id="sobrenome"
            value={getUser.sobrenome}
            readOnly
          />
        </div>
      </div>
      <div className={st.fields}>
        {/* Email */}
        <div className={cn(st.field, st.fieldEmail)}>
          <label htmlFor="email">Email</label>
          <span className={st.fieldValidation}></span>
          <input
            id="email"
            className={st.email}
            type="text"
            value={getUser.email}
            readOnly
          />
        </div>
      </div>
      <div className="flex gap-5">
        {/* CPF */}
        <div className={st.field}>
          <label htmlFor="cpf">CPF</label>
          <span className={st.fieldValidation}></span>
          <input id="cpf" type="text" value={getUser.cpf} readOnly />
        </div>
        {/* Data Nascimento */}
        <div className={st.field}>
          <label htmlFor="data_nascimento">Data de nascimento</label>
          <span className={st.fieldValidation}></span>
          <input
            id="data_nascimento"
            type="text"
            value={getUser.dataNascimento}
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
