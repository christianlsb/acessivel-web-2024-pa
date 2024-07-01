import st from "@/styles/Register.module.css";
import { Button } from "../ui/button";
import { useState } from "react";
import { z } from "zod";
import Link from "@/components/link";

const cadPcdBool = true;

const formSchema = z.object({
  cadPcd: z.string().length(8, "O cadpcd deve ter 8 dígitos."),
});

const CadpcdForm = () => {
  const [cadPcd, setCadPcd] = useState("");

  const handleChange = (event: any) => {
    setCadPcd(event.target.value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:2424/queixante/patch/cadpcd",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idQueixante: 13,
            cadPcd: cadPcd,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar o valor");
      }

      setCadPcd("");
      console.log("Valor enviado com sucesso:", cadPcd);

      const data = await response.json();
      console.log("Resposta da API:", data);
    } catch (error: any) {
      console.error("Erro ao enviar o valor:", error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-10 bg-white rounded-2xl">
      <h2 className={"text-center text-2xl pb-10"}>CadPCD</h2>
      <div className="flex gap-5">
        {/* CADPCD */}
        <div className={st.field}>
          <label htmlFor="cadPcd">CadPCD</label>
          <input
            id="cadPcd"
            type="text"
            placeholder="Vincule seu cadpcd"
            onChange={handleChange}
            disabled={cadPcdBool}
          />
        </div>
      </div>
      <div className={"flex mt-12 gap-4"}>
        <Button
          type="button"
          className={"w-full bg-primaryBlue rounded-md text-center"}
        >
          <Link href={"/dashboard"}>Cancelar</Link>
        </Button>
        <Button
          className={"w-full bg-primaryBlue"}
          disabled={cadPcdBool}
          type="submit"
        >
          Cadastrar
        </Button>
      </div>
    </form>
  );
};

export default CadpcdForm;
