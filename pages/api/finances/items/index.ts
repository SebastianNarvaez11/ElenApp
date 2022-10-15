import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { Item } from '../../../../interfaces'
import { ItemModel } from '../../../../models'

type Data =
    | { message: string }
    | Item[]
    | Item


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getItems(res)

        case 'POST':
            return postItems(req, res)


        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}


const getItems = async (res: NextApiResponse<Data>) => {

    try {
        await db.connect()
        const items: Item[] = await ItemModel.find().sort({ createdAt: 'descending' })
        await db.disconnect()

        res.status(200).json(items)
    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al obtener los items' })
    }
}



const postItems = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { concept, value, type, category } = req.body
    const newItem = new ItemModel({ concept, value, type, category, createdAt: Date.now() })

    try {
        await db.connect()
        await newItem.save()
        await db.disconnect()
        return res.status(200).json(newItem)
    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al crear el item' })
    }
}