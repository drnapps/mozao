import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDTO } from '../../../../data/dtos/ResponseDTO';
import { prisma } from '../../../../lib/prisma';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseDTO>,
) => {
    const db = prisma.raffle;
    const jsonData = req.body;
    console.log(jsonData);
    if (req.method === 'POST') {
        try {
            const newData = await db.create({ data: jsonData });
            if (newData) {
                res.status(200).json({ status: 'success' });
            } else {
                res.status(401).json({ status: 'error', message: 'Esses dados já estão cadastrados' });
            }
        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;