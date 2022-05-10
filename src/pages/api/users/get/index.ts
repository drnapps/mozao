import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDTO } from '../../../../data/dtos/ResponseDTO';
import { prisma } from '../../../../lib/prisma';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseDTO>,
) => {
    const db = prisma.user;
    if (req.method === 'GET') {
        try {
            const data = await db.findMany({
                where: {
                    status: 1,
                },
                include: {
                    order: true
                },
                orderBy: { id: 'desc' }
            });

            res.status(200).json({ status: 'success', content: data });
        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;