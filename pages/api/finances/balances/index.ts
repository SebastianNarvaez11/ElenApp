import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { Balance } from '../../../../interfaces'
import BalanceModel from '../../../../models/Balance'

type Data =
    | { message: string }
    | Balance[]
    | Balance

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getBalances(res)

        case 'POST':
            return postBalances(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}



const getBalances = async (res: NextApiResponse<Data>) => {

    try {
        await db.connect()
        const balance: Balance[] = await BalanceModel.find().sort({ date: 'ascending' })
            .populate('items')

        await db.disconnect()
        return res.status(200).json(balance)

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al obtener los balances' })
    }
}



const postBalances = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { date } = req.body
    const newBalance = new BalanceModel({ date, createdAt: Date.now() })

    try {
        await db.connect()
        newBalance.save()
        await db.disconnect()
        return res.status(201).json(newBalance)

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al crear el balance' })
    }
}
