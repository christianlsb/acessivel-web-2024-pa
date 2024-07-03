import st from "@/styles/Register.module.css";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import Link from "@/components/link";
import Cookies from "js-cookie";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  cadPcd: z.string().length(8, "O cadpcd deve ter 8 dígitos."),
});

interface CadPCD {
  idQueixante: number;
  cadPcd: string;
}

const CadpcdForm = () => {
  const [getUser, setUser] = useState<CadPCD>({
    idQueixante: 0,
    cadPcd: "",
  });

  const [loading, setLoading] = useState(false);
  const { user } = JSON.parse(Cookies.get("user") || "{}");

  console.log(getUser);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...getUser, cadPcd: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
            idQueixante: getUser.idQueixante,
            cadPcd: getUser.cadPcd,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar o valor");
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      toast({
        title: "Sucesso ao cadastrar seu cadpcd",
        description: "Seu cadpcd foi cadastrado com sucesso.",
        variant: "sucess",
      });
    } catch (error: any) {
      console.error("Erro ao enviar o valor:", error.message);
      toast({
        title: "Erro ao cadastrar seu cadpcd",
        description: "Erro ao cadastrar seu cadpcd.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-10 bg-white rounded-2xl">
      <h2 className="text-center text-2xl pb-10">CadPCD</h2>
      <div className="flex gap-5">
        {/* CADPCD */}
        <div className={st.field}>
          <label htmlFor="cadPcd">CadPCD</label>
          <input
            id="cadPcd"
            type="text"
            placeholder="Vincule seu cadpcd"
            value={getUser.cadPcd}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex mt-12 gap-4">
        <Button
          type="button"
          className="w-full bg-primaryBlue rounded-md text-center"
        >
          <Link href={"/dashboard/home"}>Cancelar</Link>
        </Button>
        <Button className="w-full bg-primaryBlue" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
};

export default CadpcdForm;
