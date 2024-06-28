import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { titulo, descricao, userId } = req.body; 
        try {
            const newQueixa = await prisma.queixa.create({
                data: {
                    titulo,
                    descricao,
                    user: {
                        connect: {
                            id: Number(userId),
                        },
                    },
                },
            });

            res.status(200).json(newQueixa);
        } catch (error) {
            console.error("Error creating queixa:", error);
            res.status(500).json({ error: "Erro ao criar queixa" });
        }
    } else {
        res.status(405).json({ error: "Método não permitido" });
    }
}
