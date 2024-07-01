// @ts-ignore
import nodemailer from 'nodemailer';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { nome, email, mesagem } = req.body;

        const message = `A pessoa ${nome} com a matricula ${matricula} solicitou um novo cadastro governamental`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_POST_GOVERNO,
                pass: process.env.PASSWORD_POST_GOVERNO
            }
        });

        // Configurar o email
        const mailOptions = {
            from: process.env.EMAIL_POST_GOVERNO,
            to: process.env.EMAIL_POST_GOVERNO,
            subject: `Solicitação de ${nome} para uma nova conta governamental`,
            text: message
        };

        // Enviar o email
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email enviado com sucesso!' });
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
