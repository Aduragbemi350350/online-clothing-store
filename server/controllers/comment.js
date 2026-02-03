import { text } from "express"
import createCommentTree from "../utilities/createCommentTree.js"
import dateToISO from "../utilities/dateToISO.js"
import { makeReaction, reverseReaction } from "../utilities/userReactions.js"
import Comment from "../models/Comment.js"

//get comments
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()

        comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        const commentTree = createCommentTree(comments)

        res.status(200).json(commentTree)
        console.log("Comment tree: ", commentTree)
    } catch (error) {
        console.log("Get comment error: ", error.message)
        res.status(500).json({ "Get comment error: ": error.message })
    }
}

//post comment
export const postComment = async (req, res) => {
    try {
        //get user details from middleware
        const user = req.user

        // check if user and comment details exist
        if (!req.body || !user) {
            console.log({ noContent: "There's no user or content available" })
            res.status(400).json({ noContent: "There's no user or content available" })
        }

        const comment = {
            user: user._id,
            product: req.body.product,
            text: req.body.text,
            parent: req.body?.parent
        }

        const commentCreated = await Comment.create(comment)

        if (!commentCreated) return res.status(400).json({ errorMess: "Comment wasn't created successfuly!" })

        console.log({ mess: commentCreated })
        res.status(200).json({ mess: commentCreated })
    } catch (error) {
        console.log({ message: error.message })
        res.status(500).json({ mess: error.message })
    }
}

//react to comment
export const reactToComment = async (req, res) => {
    try {
        const { comment: commentId, reaction: reactionType } = req.body

        const user = req.user

        //check for body
        if (!req.body || !user) return res.status(400).json({ noContent: "At leaast one of the comment details wasn't found!" })

        const comment = await Comment.findById(commentId)

        //check for comment
        if (!comment) return res.status(400).json({ noContent: "comment wasn't found!" })

        // like reaction block
        if (reactionType === "like") {
            //confirm if the user hasn't dislike the comment
            if (comment.like.includes(user._id)) {
                //reverse reaction
                const reverseReactionReport = reverseReaction(user, commentId, reactionType)

                console.log("reverse reaction: ", reverseReactionReport)
                res.status(200).json({ "reverse reaction:": reverseReactionReport })
                return
            }

            const reactionReport = makeReaction(user, commentId, reactionType)
            console.log("reaction report: ", reactionReport)
            res.status(200).json({ "reaction report:": reactionReport })
            return
        }


        //dislike reaction block
        if (reactionType === "dislike") {
            //confirm if the user hasn't dislike the comment
            if (comment.dislike.includes(user._id)) {
                //reverse reaction
                const reverseReactionReport = reverseReaction(user, commentId, reactionType)

                console.log("reverse reaction: ", reverseReactionReport)
                res.status(200).json({ "reverse reaction:": reverseReactionReport })
                return
            }

            const reactionReport = makeReaction(user, commentId, reactionType)
            console.log("reaction report: ", reactionReport)
            res.status(200).json({ "reaction report:": reactionReport })
            return
        }
    } catch (error) {
        console.log({ "make reaction error": error.message })
        res.status(200).json({ "make reaction error": error.message })
    }
}

//delte comment
export const deleteComments = async (req, res) => {
    //delete all the comments
    try {
        await Comment.deleteMany()
        res.status(200).json({ mess: "All comments has been deleted!" })
    } catch (error) {
        console.log({ mess: error.message })
    }
}

