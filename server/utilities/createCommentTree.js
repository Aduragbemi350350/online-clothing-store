import mongoose from "mongoose"
import dateToISO from "./dateToISO.js"

export default function createCommentTree(comments, productId) {

    //transform or modify comments so as to make use the custom formatted date
    const modifiedComments = comments.map((comment) => {
        //convert the comment date
        const createdAt = dateToISO(comment.createdAt)
        const updatedAt = dateToISO(comment.updatedAt)

        const newComment = {
            _id: comment._id,
            user: comment.user,
            product: comment.product,
            parent: comment.parent,
            text: comment.text,
            dislike: comment.dislike,
            like: comment.like,
            createdAt,
            updatedAt
        }

        return newComment
    })

    console.log({
        mess: "Show modified comments",
        modifiedComments
    })

    //confirm if there is modifiedComments
    if (!modifiedComments) {
        //show result
        console.log({
            mess: "Comment cannot be refactor to use custom date"
        })
        throw new Error("Comment cannot be refactor to use custom date")
    }

    //create comment map
    const commentsMap = {}
    modifiedComments.map((comment) => {
        comment.children = []    //create children property
        commentsMap[comment._id] = comment
    })

    //create rootComments
    const rootComment = []
    modifiedComments.map((comment) => {
        //check if comment is a parent
        if (comment.parent === null) {
            rootComment.push(commentsMap[comment._id])
            return
        }

        //else, comment is a child hence should be added to its parent
        const parent = commentsMap[comment.parent]
        if (parent) {
            parent.children.push(comment)
        }
    })

    //get comments for product
    const productComments = rootComment.filter((comment) => {
        return String(comment.product) === String(productId)
    })

    //see and return result
    console.log({
        mess: "Comments for product fetched",
        productComments
    })
    return productComments
}
