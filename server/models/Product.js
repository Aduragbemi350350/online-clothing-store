import mongoose from "mongoose";
import  Review  from "./Review.js";


const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, enum: ["ankara", "tshirt", "jeans", "hoodie", "jacket"] ,required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    ratings: {type: Number, default:0 ,required: true},
    slug: {type: String, required: true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        },
    ]
}, {timestamps: true})


const Product = mongoose.model("Product", productSchema)


export default Product