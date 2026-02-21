import createCommentTree from "../utilities/createCommentTree.js"
import { makeReaction, reverseReaction } from "../utilities/userReactions.js"
import Comment from "../models/Comment.js"
import errorHandler from '../utilities/errorHandler.js'

//get comments
export const getComments = async (req, res) => {
    try {
        //fetch comments
        const comments = await Comment.find()

        //sort comments
        comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        //show result
        console.log({
            mess: "Fetch comments from DB",
            comments
        })
        res.status(200).json(comments)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Get comments error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//get comment
export const getProductComments = async (req, res) => {
    try {
        //get comments
        const comments = await Comment.find()
        const productId = req.params.productId
        console.log({
            mess: "Product ID",
            id: req.params.productId
        })

        if (!productId) {
            //show result
            console.log({
                mess: "There's no product ID",
            })
            res.status(400).json({
                mess: "There's no product ID",
            })
        }

        if (!comments) {
            //show result
            console.log({
                mess: "Comment wasn't fetched from DB",
            })
            res.status(400).json({
                mess: "Comment wasn't fetched from DB",
            })
        }

        //sort comments based in descending order of the array.
        comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        //get comments for product
        const productComments = createCommentTree(comments, req.params.productId)

        console.log({
            mess: "Comments for product fetched",
            productComments
        })
        res.status(200).json(productComments)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Get comments error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//post comment
export const postComment = async (req, res) => {
    try {
        //get user details from middleware
        const user = req.user
        const { text } = req.body

        // check if user and comment details exist
        if (!text || !user) {
            console.log({
                mess: "There's no user or content available",
                user,
                body: req.body
            })
            return res.status(400).json({ mess: "There's no user or content available" })
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
        const err = errorHandler(error)
        console.log({
            mess: "Post comment error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//react to comment
export const reactToComment = async (req, res) => {
    try {
        const { comment: commentId, reaction: reactionType } = req.body

        //get user
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
        const err = errorHandler(error)
        console.log({
            mess: "React to comment error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//delete comments
export const deleteComments = async (req, res) => {
    //delete all the comments
    try {
        //get user
        const user = req.user

        //check user
        if (!user) {
            //show result
            console.log({
                mess: "User isn't signed in or comment isn't valid"
            })
            res.status(401).json({ mess: "Please, sign in and continue" })
        }
        await Comment.deleteMany()
        res.status(200).json({ mess: "All comments has been deleted!" })
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Delete comments error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//delete comment
export const deleteComment = async (req, res) => {
    try {
        //get comment ID
        const commentId = req.params.id

        //get user
        const user = req.user

        //check user
        if (!user || !commentId) {
            //show result
            console.log({
                mess: "User isn't signed in or comment isn't valid"
            })
            res.status(401).json({ mess: "Please, sign in and continue" })
        }


        //check if the comment is a parent
        const deleteChildren = async (commentId) => {
            //delete comment
            const comment = await Comment.findByIdAndDelete(commentId)

            //find children of comment
            const commentChildren = await Comment.find({ parent: commentId })

            //continue operation if children exist
            if (commentChildren.length > 0) {
                commentChildren.map((comment) => {
                    //recursive operation
                    deleteChildren(comment._id)
                })
            }
            return comment
        }
        //Initiate the deleteChildren function
        const deletetionResult = deleteChildren(commentId)

        console.log({
            mess: "Comment is deleted",
            deletetionResult
        })
        res.status(200).json({ mess: "Comment is deleted!" })
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Delete comments error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

