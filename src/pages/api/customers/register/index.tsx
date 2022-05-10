import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseDTO } from "../../../../data/dtos/ResponseDTO";
import { prisma } from "../../../../lib/prisma";
import md5 from "../../../../lib/md5";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO>
) => {
  const db = prisma.customer;

  if (req.method === "POST") {
    const { email, password, telefone, name, userId } = req.body;

    try {
      const user = await db.create({
        data: {
          email,
          password: md5(password),
          telefone,
          name,
          userId,
          status: 1,
        },
      });

      res.status(200).json({ status: "success", content: user });
    } catch (err) {
      res
        .status(403)
        .json({ status: "error", message: "Não foi possível cadastrar" });
    }
  } else {
    res.status(403).json({ status: "error", message: "Método não permitido" });
  }
};

export default handler;
