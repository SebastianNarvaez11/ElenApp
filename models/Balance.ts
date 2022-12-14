import mongoose, { Model, Schema } from 'mongoose'
import { IBalance } from './../interfaces/finances';

const BalanceSchema = new Schema({

    date: { type: Number, required: [true, 'La fecha es obligatoria'] },
    createdAt: { type: Number },
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
    
})

const BalanceModel: Model<IBalance> = mongoose.models.Balance || mongoose.model('Balance', BalanceSchema)

export default BalanceModel