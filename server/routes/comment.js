import express from 'express'
const commentRouter = express.Router()
import { deleteComment, deleteComments, getComments, getProductComments, postComment, reactToComment } from '../controllers/comment.js'
import {authMiddleWare} from '../auth/authMiddleware.js'

commentRouter
    .get("/", getComments)

    .get("/:productId", getProductComments)

    .post("/", authMiddleWare, postComment)

    .post("/reaction",authMiddleWare, reactToComment)

    .delete("/", authMiddleWare, deleteComments)

    .delete("/:id", authMiddleWare, deleteComment)
export default commentRouter

