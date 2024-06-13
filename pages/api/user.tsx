import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { nome, sobrenome, email, senha, cpf, data_nascimento } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          nome,
          sobrenome,
          email,
          senha,
          cpf,
          data_nascimento: new Date(data_nascimento),
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
