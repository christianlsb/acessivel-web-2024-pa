import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { nome, sobrenome, email, senha, cpf, data_nascimento } = req.body;

    // verificar se o email ja existe
    try {
      const existingUserEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUserEmail) {
        return res.status(400).json({ error: "E-mail já existe" });
      }
      // verificar se o cpf ja existe
      const existingUserCpf = await prisma.user.findUnique({
        where: {
          cpf,
        },
      });

      if (existingUserCpf) {
        return res.status(400).json({ error: "CPF já existe" });
      }

      // criptografar senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // cria user
      const newUser = await prisma.user.create({
        data: {
          nome,
          sobrenome,
          email,
          senha: hashedPassword,
          cpf,
          data_nascimento: new Date(data_nascimento),
        },
      });

      res.status(200).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
