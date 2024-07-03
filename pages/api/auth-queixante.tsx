import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "js-cookie";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, senha } = req.body;

    try {
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root123",
        database: "acessivel-api",
      });

      // Consulta SQL para buscar o usuário pelo email e senha
      const [rows] = await connection.query(
        "SELECT * FROM queixante WHERE email = ? AND senha = ?",
        [email, senha]
      );

      if (rows.length === 0) {
        res
          .status(401)
          .json({ error: "Usuário não encontrado ou credenciais inválidas" });
        return;
      }

      const user = rows[0];

      // Criação do token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload do token
        "secreto", // Chave secreta para assinar o token (deve ser guardada de forma segura)
        { expiresIn: "1h" } // Opções do token, como tempo de expiração
      );

      delete user.senha;

      res.status(200).json({ token, user });
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      res.status(500).json({ error: "Erro ao autenticar usuário" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
