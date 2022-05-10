import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseDTO } from "../../../../data/dtos/ResponseDTO";
import { prisma } from "../../../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO>
) => {
  const db = prisma.raffle;
  const jsonData = req.body;
  console.log(jsonData);
  if (req.method === "PUT") {
    try {
      const updateData = await db.update({
        where: {
          id: Number(jsonData.id),
        },
        data: {
          name: jsonData.name,
          datetime: new Date(jsonData.datetime!),
          price: jsonData.price,
          quantity: jsonData.quantity,
          path: jsonData.path
        },
      });
      res
        .status(200)
        .json({
          status: "success",
          message: "Modificações realizadas com sucesso",
        });
    } catch (err) {
      console.log(err);
      res.status(401).json({ status: "error", message: "Erro ao modificar" });
    }
  } else {
    res.status(401).json({ status: "error", message: "Método não permitido" });
  }
};

export default handler;
