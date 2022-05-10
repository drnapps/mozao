// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseDTO } from '../../../../data/dtos/ResponseDTO'
import md5 from '../../../../lib/md5'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO>
) {
  try {
      const createUser = await prisma.user.create({
          data: {
            email: "contato@mozao.com.br",
            password: md5("12345"),
            name: "Admin",
            document: "000.000.000-00",
            path: "user.png",
            level: 'ADMIN',
            status: 1
          }
      });
      res.status(200).json({ status: "success" })
  } catch(err) {
    res.status(401).json({ status: "error" })
  }
}
