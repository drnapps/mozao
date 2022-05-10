import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseDTO } from "../../../data/dtos/ResponseDTO";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { prisma } from '../../../lib/prisma';
import md5 from '../../../lib/md5';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseDTO>,
  ) => {
    const db = prisma.user;
    const secret = '65417B70A1A7BD08A6189F4D309D90979CBE7B56';

    //   res.status(200).json({ status: 'success' })
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Busca usuário no banco de dados pelo e-mail
        const user = await db.findUnique({
            where: {
              email: email
            }
          });

          if (user && user.password === md5(password)) {
              // Usuário válido
              const token = sign(
                {
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
                  username: email,
                },
                secret
              );

              const serialised = serialize("drntoken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
              });
          
              res.setHeader("Set-Cookie", serialised);
          
              res.status(200).json({ status: "success",content: user });

          } else {
              // Dados incorretos
              res.status(401).json({ status: 'error', message: 'E-mail ou senha inválidos' })
          }

    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' })
    }
}

export default handler;