import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Necessidade {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  cronica: boolean;
  tipo: string;
  status: string;
}

const NecessidadesList = () => {
  const [data, setData] = useState<Necessidade[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = JSON.parse(Cookies.get("user") || "{}");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:2424/necessidade/get/queixante/${user.id_queixante}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter dados do usuário");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  return (
    <Table className="w-[calc(100%-200px)] mx-auto">
      <TableCaption>Suas necessidades registradas:</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Localização</TableHead>
          <TableHead>Cronica?</TableHead>
          <Table>Tipo</Table>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              Carregando...
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              Nenhuma necessidade encontrada.
            </TableCell>
          </TableRow>
        ) : (
          data.map((queixa) => (
            <TableRow key={queixa.id}>
              <TableCell>{queixa.titulo}</TableCell>
              <TableCell>{queixa.descricao}</TableCell>
              <TableCell>{queixa.localizacao}</TableCell>
              <TableCell>{queixa.cronica ? "Sim" : "Não"}</TableCell>
              <TableCell>{queixa.tipo}</TableCell>
              <TableCell>{queixa.status ? "Aprovada" : "Aguardando"}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default NecessidadesList;
