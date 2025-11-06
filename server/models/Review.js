import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    comment: {type: String},
    reaction: {type: String , enum: ["like", "dislike"]},
    rating: {type: Number, min:0, max:5},
}, {timestamps: true})

const Review = mongoose.model("Review", reviewSchema)

export default Review