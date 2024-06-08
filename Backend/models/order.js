import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: String,
        required: true,
    },
    foods: [
        {
          id: {type: Number, required: true},
          name: { type: String, required: true },
          itemPrice: { type: String, required: true },
          category: { type: String, required: true },
          image: { type: String, required: true },
          quantity: { type: Number, required: true },
          totalPrice: { type: Number, required: true }
        }
    ],
    total: {
        type: Number,
        required: true,
    },
})

export default model('Order', OrderSchema);