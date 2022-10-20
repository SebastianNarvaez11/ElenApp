import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { ItemModel } from '../../../../models'

type Data = {
    message: string
}

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
        await ItemModel.findByIdAndDelete(id)
        await db.disconnect()
        return res.status(200).json({ message: 'Item eliminado correctamente' })

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al eliminar el item' })
    }

}