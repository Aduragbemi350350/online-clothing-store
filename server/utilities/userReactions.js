import mongoose from "mongoose"
import Comment from "../models/Comment.js"


export async function makeReaction(user, commentId, reactionType) {
    try {
        const reaction = await Comment.updateOne({ _id: commentId }, {
            $pull: {
                [reactionType === "dislike" ? "like" : "dislike"]: new mongoose.Types.ObjectId(user)
            },
            $addToSet: {
                [reactionType]: {
                    $each: [new mongoose.Types.ObjectId(user)]
                }
            }
        })
        return reaction
    } catch (error) {
        throw new Error(`Unknown error ocuured: ${error.message}`)
    }
}

export async function reverseReaction(user, commentId, reactionType) {
    try {
        const reaction = await Comment.updateOne({ _id: commentId }, {
            $pull: {
                [reactionType === "like" ? "dislike" : "like"]: new mongoose.Types.ObjectId(user),
                [reactionType]: new mongoose.Types.ObjectId(user)
            }
        })
        return reaction
    } catch (error) {
        throw new Error(`Unknown error ocuured: ${error.message}`)
    }
}
