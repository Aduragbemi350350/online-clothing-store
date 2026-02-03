import express from 'express'
const commentRouter = express.Router()
import Comment from '../models/Comment.js'
import { deleteComments, getComments, postComment, reactToComment } from '../controllers/comment.js'
import {authMiddleWare} from '../auth/authMiddleware.js'

commentRouter
    .get("/", getComments)

    .post("/", authMiddleWare, postComment)

    .post("/reaction",authMiddleWare, reactToComment)

    .delete("/", deleteComments)
export default commentRouter

