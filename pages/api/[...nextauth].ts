import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'next-auth/jwt'
import { decode } from 'jsonwebtoken'

const options: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                username: { type: 'text' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                try {
                    // Exemplo de autenticação básica
                    const { username, password } = credentials
                    const response = await fetch('auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, password }),
                    })

                    if (!response.ok) {
                        throw new Error('Failed to login')
                    }

                    const data = await response.json()

                    // Aqui você pode validar se a resposta contém um token válido
                    if (!data?.token) {
                        throw new Error('Invalid token')
                    }

                    // Retornar os dados do usuário que serão armazenados no token JWT
                    return {
                        id: data.user.id,
                        username: data.user.username,
                        // Outros dados do usuário, se necessário
                    }
                } catch (error) {
                    // Lidar com erros de autenticação
                    throw new Error('Authentication failed')
                }
            },
        }),
    ],
    callbacks: {
        async jwt(token: JWT, user) {
            // Adicionar dados do usuário ao token JWT
            if (user) {
                token.id = user.id
                // Outros dados do usuário que você deseja armazenar no token
            }
            return token
        },
        async session(session, token) {
            // Adicionar dados do token à sessão do usuário
            session.user = token.id ? { id: token.id } : null
            // Adicionar outros dados do token à sessão, se necessário
            return session
        },
    },
    pages: {
        signIn: '/', // Página de login
        signOut: '/', // Página de logout
        error: '/', // Página de erro
        verifyRequest: '/', // Página de verificação de solicitação
        newUser: '/', // Página de novo usuário
    },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options)

export default Auth
