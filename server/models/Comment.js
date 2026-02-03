import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    text: String,
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    dislike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
}, {timestamps: true})


export default mongoose.model('Comment', commentSchema)