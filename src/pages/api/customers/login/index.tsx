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
    const { email, password } = req.body;
    try {
      const user = await db.findFirst({
        where: {
          email: email,
        },
      });

      if (user && user.password === md5(password)) {
        // Usuário válido
        res.status(200).json({ status: "success", content: user });
      } else {
        // Dados incorretos
        res
          .status(403)
          .json({ status: "error", message: "E-mail ou senha inválidos" });
      }
    } catch (err) {
      res
        .status(403)
        .json({ status: "error", message: "E-mail ou senha inválidos" });
    }
  } else {
    res.status(403).json({ status: "error", message: "Método não permitido" });
  }
};

export default handler;
