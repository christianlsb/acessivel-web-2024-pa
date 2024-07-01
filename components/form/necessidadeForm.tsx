import { useEffect, useState } from "react";
import st from "@/styles/Register.module.css";
import cn from "classnames";
import Cookies from "js-cookie";
import { toast } from "../ui/use-toast";
import Link from "../link";

const NecessidadeForm = () => {
  const { user } = JSON.parse(Cookies.get("user") || "{}");
  const [loading, setLoading] = useState(false);
  const [getUser, setUser] = useState({ idQueixante: 0 });

  const [getQueixa, setQueixa] = useState({
    idQueixante: 0,
    titulo: "",
    localizacao: "",
    descricao: "",
    cronica: false,
    tipo: "",
    imagemLink: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setQueixa((prevState) => ({
      ...prevState,
      idQueixante: getUser.idQueixante,
    }));
  }, [getUser]);

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setQueixa((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (getUser.endereco) {
        const response = await fetch(`http://localhost:2424/necessidade/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getQueixa),
        });

        if (!response.ok) {
          throw new Error("Erro ao enviar dados");
        }

        toast({
          title: "Necessidade cadastrada com sucesso!",
          description: "Sua necessidade foi cadastrada com sucesso!",
          variant: "sucess",
        });

        setQueixa({
          idQueixante: getUser.idQueixante,
          titulo: "",
          localizacao: "",
          descricao: "",
          cronica: false,
          tipo: "",
          imagemLink: "",
        });
      } else {
        toast({
          title: "Erro ao cadastrar necessidade",
          description:
            "Você precisa preencher o seu endereço antes de cadastrar uma necessidade",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast({
        title: "Erro ao cadastrar necessidade",
        description: "Ocorreu um erro ao cadastrar sua necessidade",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-10 bg-white rounded-2xl" onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl pb-10">Cadastrar Necessidade</h2>
      <div className="flex gap-5">
        {/* Título */}
        <div className={st.field}>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={getQueixa.titulo}
            onChange={handleChange}
          />
        </div>
        {/* Local */}
        <div className={st.field}>
          <label htmlFor="localizacao">Local</label>
          <input
            id="localizacao"
            type="text"
            value={getQueixa.localizacao}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Descrição */}
      <div className={cn(st.field, st.fieldEmail)}>
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          className="h-[112px] resize-none"
          value={getQueixa.descricao}
          onChange={handleChange}
        ></textarea>
      </div>
      {/* Link da Imagem */}
      <div className={cn(st.field, st.fieldEmail)}>
        <label htmlFor="imagemLink">Link da imagem</label>
        <input
          id="imagemLink"
          type="text"
          value={getQueixa.imagemLink}
          onChange={handleChange}
        />
      </div>
      {/* Crônica */}
      <div className={cn(st.field, st.fieldEmail)}>
        <label htmlFor="cronica">Crônica?</label>
        <select
          className="w-full p-2 rounded-lg border border-gray-300"
          id="cronica"
          value={getQueixa.cronica.toString()}
          onChange={handleChange}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      {/* Tipo */}
      <div className={cn(st.field, st.fieldEmail)}>
        <label htmlFor="tipo">Tipo</label>
        <input
          id="tipo"
          type="text"
          value={getQueixa.tipo}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button
          type="button"
          className="w-full bg-primaryBlue py-2 rounded-lg text-white"
        >
          <Link href={"/dashboard/home"}>Cancelar</Link>
        </button>
        <button
          type="submit"
          className="w-full bg-primaryBlue py-2 rounded-lg text-white"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Confirmar"}
        </button>
      </div>
    </form>
  );
};

export default NecessidadeForm;
