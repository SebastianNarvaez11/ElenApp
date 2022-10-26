import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { IDaily } from '../../../../interfaces'
import { DailyModel } from '../../../../models'

type Data =
    | { message: string }
    | IDaily
    | IDaily[]



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return postDaily(req, res)

        case 'GET':
            return getDaily(res)

            
        default:
            return res.status(400).json({ message: 'Endpoint no encontrado' })
    }

}




const postDaily = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { date } = req.body
    const daily = new DailyModel({ date, createdAt: Date.now() })

    try {
        await db.connect()
        await daily.save()
        await db.disconnect()

        return res.status(201).json(daily)
    } catch (error) {
        db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el Diario' })
    }
}


const getDaily = async (res: NextApiResponse<Data>) => {

    try {
        await db.connect()
        const dailies = await DailyModel.find().sort({ date: 'ascending' })
            .populate('items')

        await db.disconnect()

        return res.status(200).json(dailies)

    } catch (error) {
        db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Error al obtener todos los Diarios' })
    }
}