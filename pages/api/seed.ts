import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { ItemModel } from '../../models'
import BalanceModel from '../../models/Balance'

type Data =
    | { message: string }




export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este servicio estando en produccion' })
    }

    try {
        await db.connect()
        await ItemModel.deleteMany()
        await BalanceModel.deleteMany()
        await ItemModel.insertMany(seedData.items)
        await BalanceModel.insertMany(seedData.balances)
        await db.disconnect()

        res.status(200).json({ message: 'Proceso realizado correctamente' })
    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error' })
    }

}