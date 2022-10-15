import mongoose, { Model, Schema } from 'mongoose'
import { Balance } from './../interfaces/finances';
import ItemModel from './Item';

const BalanceSchema = new Schema({

    date: { type: Number, required: [true, 'La fecha es obligatoria'] },
    createdAt: { type: Number },
    items: [{type: Schema.Types.ObjectId, ref: ItemModel}]
    
})

const BalanceModel: Model<Balance> = mongoose.models.Balance || mongoose.model('Balance', BalanceSchema)

export default BalanceModel