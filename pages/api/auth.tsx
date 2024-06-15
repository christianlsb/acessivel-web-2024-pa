import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ error: "E-mail ou senha inválidos" });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "E-mail ou senha inválidos" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET ?? "",
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Erro ao fazer login" });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
