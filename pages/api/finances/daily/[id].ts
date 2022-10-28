import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { IDaily } from '../../../../interfaces'
import { DailyModel } from '../../../../models'

type Data =
    | { message: string }
    | IDaily

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'PUT':
            return putDaily(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}



const putDaily = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query
    const { items } = req.body

    try {
        await db.connect()

        const new_daily = await DailyModel.findByIdAndUpdate(id, { items }, { runValidators: true, new: true })
            .populate('items')

        await db.disconnect()

        return res.status(200).json(new_daily!)

    } catch (error) {
        console.log(error);
        await db.disconnect()
        return res.status(500).json({ message: 'Error al actualizar el diario' })
    }
}