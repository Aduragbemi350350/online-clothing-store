import express from 'express'

const router = express.Router()
import { createUser, currentUser, deleteUsers, getUsers, login, logout } from '../controllers/user.js'
import { getUser } from '../auth/authMiddleware.js'

router
    .get('/', getUsers)

    .get('/currentUser', getUser, currentUser)

    .post('/', createUser)

    .post('/login', login)

    .get('/logout', logout)

    .delete('/', deleteUsers)

export default router