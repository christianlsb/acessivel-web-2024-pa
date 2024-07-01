import st from "@/styles/Register.module.css";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import cn from "classnames";
import { z } from "zod";
import Cookies from "js-cookie";
import Link from "../link";

const formSchema = z.object({
  cep: z.string().length(8, "O CEP deve ter 8 dígitos."),
  complemento: z.string().optional(),
  logradouro: z.string().min(1, "Nome do logradouro é obrigatório."),
  numero: z.string().min(1, "Número é obrigatório."),
  cidade: z.string().min(1, "Cidade é obrigatória."),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  estado: z.string().length(2, "Estado deve ter 2 letras."),
});

interface AddressFormProps {
  idQueixante: number;
  cep: string;
  complemento: string;
  logradouro: string;
  numero: string;
  cidade: string;
  bairro: string;
  estado: string;
}

const AddressForm = () => {
  const [getUser, setUser] = useState({});
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

  const initialFormData: AddressFormProps = {
    idQueixante: user.id_queixante,
    cep: "",
    complemento: "",
    logradouro: "",
    numero: "",
    cidade: "",
    bairro: "",
    estado: "",
  };

  const [formData, setFormData] = useState<AddressFormProps>(initialFormData);
  const [errors, setErrors] = useState({
    cep: "",
    complemento: "",
    logradouro: "",
    numero: "",
    cidade: "",
    bairro: "",
    estado: "",
  });

  useEffect(() => {
    if (getUser.endereco) {
      setFormData({
        ...initialFormData,
        cep: getUser.endereco.cep || "",
        complemento: getUser.endereco.complemento || "",
        logradouro: getUser.endereco.logradouro || "",
        numero: getUser.endereco.numero || "",
        cidade: getUser.endereco.cidade || "",
        bairro: getUser.endereco.bairro || "",
        estado: getUser.endereco.estado || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [getUser]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === "cep" && value.length > 8) return;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    const fieldSchema = formSchema.shape[id];
    try {
      fieldSchema.parse(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: error.errors[0]?.message || "Erro desconhecido",
      }));
    }

    if (id === "cep" && value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prevData) => ({
            ...prevData,
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:2424/endereco/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Dados enviados com sucesso:", await response.json());
      } else {
        console.error("Erro ao enviar os dados:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-white rounded-2xl">
      <h2 className={"text-center text-2xl pb-10"}>Endereço</h2>
      <div className="flex gap-5">
        <div className={st.field}>
          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            type="text"
            value={formData.cep}
            onChange={handleChange}
            maxLength={8}
          />
          {errors.cep && <span>{errors.cep}</span>}
        </div>
        <div className={st.field}>
          <label htmlFor="complemento">Complemento</label>
          <input
            id="complemento"
            type="text"
            value={formData.complemento}
            onChange={handleChange}
          />
          {errors.complemento && <span>{errors.complemento}</span>}
        </div>
      </div>
      <div className={st.fields}>
        <div className={cn(st.field, st.fieldEmail)}>
          <label htmlFor="logradouro">Nome do logradouro</label>
          <input
            id="logradouro"
            className={st.email}
            type="text"
            value={formData.logradouro}
            onChange={handleChange}
          />
          {errors.logradouro && <span>{errors.logradouro}</span>}
        </div>
      </div>
      <div className="flex gap-5">
        <div className={st.field}>
          <label htmlFor="numero">Número</label>
          <input
            id="numero"
            type="text"
            value={formData.numero}
            onChange={handleChange}
          />
          {errors.numero && <span>{errors.numero}</span>}
        </div>
        <div className={st.field}>
          <label htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            type="text"
            value={formData.cidade}
            onChange={handleChange}
          />
          {errors.cidade && <span>{errors.cidade}</span>}
        </div>
      </div>
      <div className="flex gap-5">
        <div className={st.field}>
          <label htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            type="text"
            value={formData.bairro}
            onChange={handleChange}
          />
          {errors.bairro && <span>{errors.bairro}</span>}
        </div>
        <div className={st.field}>
          <label htmlFor="estado">Estado</label>
          <input
            id="estado"
            type="text"
            value={formData.estado}
            onChange={handleChange}
          />
          {errors.estado && <span>{errors.estado}</span>}
        </div>
      </div>
      <div className={"flex mt-12 gap-4"}>
        <Button className={"w-full bg-primaryBlue"} type="button">
          <Link href={"/dashboard/home"}>Cancelar</Link>
        </Button>
        <Button className={"w-full bg-primaryBlue"} type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
