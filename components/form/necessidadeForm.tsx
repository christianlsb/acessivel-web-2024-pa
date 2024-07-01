import st from "@/styles/Register.module.css";
import { useState, useRef } from "react";
import cn from "classnames";

const NecessidadeForm = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
    <form className="p-10 bg-white rounded-2xl" onSubmit={handleSubmit}>
      <h2 className={"text-center text-2xl pb-10"}>Cadastrar Necessidade</h2>
      <div className="flex gap-5">
        {/* Título */}
        <div className={st.field}>
          <label htmlFor="nome">Título</label>
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
          <label htmlFor="descricao">Descrição</label>
          <span className={st.fieldValidation}></span>
          <textarea id="descricao" className="h-[112px] resize-none"></textarea>
        </div>
      </div>
      <div className={st.fields}>
        {/* Imagem */}
        <div className={cn(st.field, st.fieldEmail)}>
          <label htmlFor="imagem">Imagem</label>
          <span className={st.fieldValidation}></span>
          <input
            ref={fileInputRef}
            id="imagem"
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                Array.from(files).forEach((file) => {
                  console.log("Arquivo selecionado:", file);
                });
              }
            }}
          />
          <div
            className="h-[112px] border border-gray-300 flex items-center justify-center cursor-pointer"
            onClick={handleFileSelect}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* Ícone de seleção de arquivo */}
            </svg>
            <span className="text-gray-400">Selecionar imagem</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="w-full bg-primaryBlue py-2 rounded-lg text-white"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-full bg-primaryBlue py-2 rounded-lg text-white"
        >
          Confirmar
        </button>
      </div>
    </form>
  );
};

export default NecessidadeForm;
