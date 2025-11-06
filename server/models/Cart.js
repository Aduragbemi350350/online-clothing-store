import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {type: Number, default: 1},
            price: {type: Number, required: true}
        }
    ],
},{timestamps: true})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart