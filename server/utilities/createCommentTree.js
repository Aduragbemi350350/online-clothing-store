import dateToISO from "./dateToISO.js"

export default function createCommentTree(comments) {

    const modifiedComments = []

    comments.map((comment) => {
    
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

        //push new comment to modified comment
        modifiedComments.push(newComment)
    })

    //confirm if there is modifiedComments
    if (!modifiedComments) return { noContent: "Comments not found!" }

    //create comment map
    const commentsMap = {}
    modifiedComments.map((comment) => {
        comment.children = []    //create children property
        commentsMap[comment._id] = comment
    })

    //create rootComments
    const rootComment = []
    comments.map((comment) => {
        //check if comment is a parent
        if (comment.parent === null) {
            const commentId = comment._id
            rootComment.push(commentsMap[commentId])
            return
        }

        //else, comment is a child hence should be added to its parent
        const parent = commentsMap[comment.parent]
        parent.children.push(comment)
    })

    //send comment tree
    return  rootComment
}
