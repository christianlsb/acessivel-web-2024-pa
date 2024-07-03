import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Cookies from "js-cookie";
import { get } from "http";

interface Necessidade {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  cronica: boolean;
  tipo: string;
  status: string;
  queixante: {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    cadPcd: string;
  };
}

const QueixasGovernoAll = () => {
  const [data, setData] = useState<Necessidade[]>([]);
  const [loading, setLoading] = useState(false);
  const [getUserGoverno, setUserGoverno] = useState<any>({});
  const [getUserQueixante, setUserQueixante] = useState<any>({});
  const { user } = JSON.parse(Cookies.get("user") || "{}");

  const getUserDataGoverno = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:2424/governo/get/${user.id_governo}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter dados do usuário");
      }
      const data = await response.json();
      setUserGoverno(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDataGoverno();
  }, []);

  const getUserDataQueixante = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:2424/queixante/get/${user.id_queixante}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter dados do usuário");
      }
      const data = await response.json();
      setUserQueixante(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDataQueixante();
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:2424/necessidade/get`);
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
      <TableCaption>Necessidades registradas</TableCaption>
      <TableHeader>
        <TableRow>
          {getUserGoverno.idGoverno && (
            <>
              <TableHead>Nome</TableHead>
              <TableHead>Sobrenome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>CadPCD</TableHead>
              <TableHead>CPF</TableHead>
            </>
          )}
          <TableHead>Título</TableHead>
          <TableHead>Cronica</TableHead>
          <TableHead>Tipo</TableHead>
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
              Nenhuma necessiade encontrada.
            </TableCell>
          </TableRow>
        ) : (
          data.map((queixa) => (
            <TableRow key={queixa.id}>
              {getUserGoverno.idGoverno && (
                <>
                  <TableCell>{queixa.queixante.nome}</TableCell>
                  <TableCell>{queixa.queixante.sobrenome}</TableCell>
                  <TableCell>{queixa.queixante.email}</TableCell>
                  <TableCell>{queixa.queixante.cadPcd}</TableCell>
                  <TableCell>{queixa.queixante.cpf}</TableCell>
                </>
              )}
              <TableCell>{queixa.titulo}</TableCell>
              <TableCell>{queixa.cronica ? "Sim" : "Não"}</TableCell>
              <TableCell>{queixa.tipo}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default QueixasGovernoAll;
