import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { Balance } from '../../../../interfaces'
import { ItemModel } from '../../../../models'
import BalanceModel from '../../../../models/Balance'

type Data =
    | { message: string }
    | Balance

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'PUT':
            return putBalance(req, res)

        case 'DELETE':
            return deleteBalance(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}


const putBalance = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    try {
        await db.connect()
        const balance = await BalanceModel.findById(id)

        const { items = balance?.items, add_item_id, del_item_id } = req.body

        // actualizamos el balance
        const new_balance = await BalanceModel.findByIdAndUpdate(id, { items }, { runValidators: true, new: true })
            .populate('items')

        // actualizamos el item que fue añadido
        if (add_item_id) {
            console.log('se esta actulizando un item añadido');
            
            await ItemModel.findByIdAndUpdate(add_item_id, { $push: { balances: id } })
        }

        // actualizamos el item que fue eliminado
        if (del_item_id) {
            await ItemModel.findByIdAndUpdate(add_item_id, { $pull: { balances: id } })
        }

        await db.disconnect()

        return res.status(200).json(new_balance!)

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al actualizar el balance' })
    }
}


const deleteBalance = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    try {
        await db.connect()
        await BalanceModel.findByIdAndDelete(id)
        await db.disconnect()

        return res.status(200).json({ message: 'Balance eliminado correctamente' })
    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error eliminar el balance' })
    }
}