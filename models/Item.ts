import mongoose, { Model, Schema } from 'mongoose'
import { Item } from '../interfaces'

const itemSchema = new Schema({

    concept: { type: String, required: [true, 'El concepto es obligatorio'] },
    value: { type: Number, required: [true, 'El valor es obligatorio'] },
    balances: [{type: Schema.Types.ObjectId, ref: 'Balance'}],
    category: {
        type: String,
        enum: {
            values: ['Hogar', 'Educacion', 'Alimentacion', 'Vehiculo', 'Transporte', 'Trabajo', 'Recreacion'],
            message: '{VALUE} no es una categoria permitida'
        }
    },
    type: {
        type: String,
        enum: {
            values: ['income', 'expense'],
            message: '{VALUE} no es una tipo de item permitido'
        }
    },
    createdAt: { type: Number },

})

const ItemModel: Model<Item> = mongoose.models.Item || mongoose.model('Item', itemSchema)

export default ItemModel