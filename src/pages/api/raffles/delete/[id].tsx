import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDTO } from '../../../../data/dtos/ResponseDTO';
import { prisma } from '../../../../lib/prisma';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseDTO>,
) => {
    const { id } = req.query
    const db = prisma.raffle;
    if (req.method === 'DELETE') {
        try {
            const raffle = await db.delete({
                where: { id: Number(id) }
            });
            res.status(200).json({ status: 'success' });
        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;