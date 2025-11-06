import mongoose from 'mongoose'


const orderSchema = mongoose.Schema({
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
    totalCost: {type: Number},
    status: {type: String , enum: ["pending", "delivered"],required: true},
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)

export default Order