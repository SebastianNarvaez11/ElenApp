import mongoose, { Model, Schema } from 'mongoose'
import { IDaily } from '../interfaces'

const DailySchema = new Schema({

    date: { type: Number, required: [true, 'La fecha es obligatoria'] },
    createdAt: { type: Number },
    items : [{type: Schema.Types.ObjectId, ref : 'Item'}]
})

const DailyModel: Model<IDaily> = mongoose.models.Daily || mongoose.model('Daily', DailySchema)

export default DailyModel