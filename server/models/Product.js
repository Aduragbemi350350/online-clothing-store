import mongoose from "mongoose";
import  Review  from "./Review.js";


//image schema
const imageSchema = mongoose.Schema({
    publicId: String,
    secureURL: String,
    resourceType: String,
    folder: String,
    originalFilename: String
})


//product schema
const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, enum: ["ankara", "tshirt", "jeans", "hoodie", "jacket"] ,required: true},
    images: [imageSchema],
    price: {type: Number, required: true},
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    slug: {type: String, required: true, unique: true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


const Product = mongoose.model("Product", productSchema)


export default Product