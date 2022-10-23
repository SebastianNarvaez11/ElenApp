import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { IBalance } from '../../../../interfaces'
import { ItemModel } from '../../../../models'
import BalanceModel from '../../../../models/Balance'

type Data =
    | { message: string }
    | IBalance[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'DELETE':
            return deleteItem(req, res)

        default:
            return res.status(500).json({ message: 'Endpoint no existe' })
    }
}




const deleteItem = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    try {
        await db.connect()
        const item = await ItemModel.findById(id)
        await item?.remove()

        // se actualizan todos los balances que contenian el item elimnado
        await BalanceModel.updateMany({ _id: item?.balances }, { $pull: { items: id } })

        // se obtienen todos los balances nuevamente para actualizar el state del frontend
        const balances: IBalance[] = await BalanceModel.find().sort({ date: 'ascending' })
            .populate('items')

        await db.disconnect()

        return res.status(200).json(balances)

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al eliminar el item' })
    }

}