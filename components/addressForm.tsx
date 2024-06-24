import st from "@/styles/Register.module.css";
import { Button } from "./ui/button";
import { useState } from "react";
import cn from "classnames";
import { z } from "zod";

const formSchema = z.object({
  cep: z.string().length(8, "O CEP deve ter 8 dígitos."),
  complemento: z.string().optional(),
  nomeLogradouro: z.string().min(1, "Nome do logradouro é obrigatório."),
  numero: z.string().min(1, "Número é obrigatório."),
  cidade: z.string().min(1, "Cidade é obrigatória."),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  estado: z.string().length(2, "Estado deve ter 2 letras."),
});

interface AddressFormProps {
  cep: string;
  complemento: string;
  nomeLogradouro: string;
  numero: string;
  cidade: string;
  bairro: string;
  estado: string;
}

const AddressForm = () => {
  const [formData, setFormData] = useState<AddressFormProps>({
    cep: "",
    complemento: "",
    nomeLogradouro: "",
    numero: "",
    cidade: "",
    bairro: "",
    estado: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = async (event: any) => {
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
        [id]: null,
      }));
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: error.errors[0].message,
      }));
    }

    if (id === "cep" && value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prevData) => ({
            ...prevData,
            nomeLogradouro: data.logradouro || "",
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      return;
    }
    console.log("Dados validados:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-formContainer">
      <div className="flex gap-5">
        {/* CEP */}
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
        {/* Complemento */}
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
        {/* Nome do logradouro */}
        <div className={cn(st.field, st.fieldEmail)}>
          <label htmlFor="nomeLogradouro">Nome do logradouro</label>
          <input
            id="nomeLogradouro"
            className={st.email}
            type="text"
            value={formData.nomeLogradouro}
            onChange={handleChange}
          />
          {errors.nomeLogradouro && <span>{errors.nomeLogradouro}</span>}
        </div>
      </div>
      <div className="flex gap-5">
        {/* Número */}
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
        {/* Cidade */}
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
        {/* Bairro */}
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
        {/* Estado */}
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
      <Button type="submit">Cadastrar endereco</Button>
    </form>
  );
};

export default AddressForm;
