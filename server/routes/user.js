import express from 'express'
import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')


const router = express.Router()
import { createUser, currentUser, deleteUser, deleteUsers, getUsers, login, logout } from '../controllers/user.js'
import { getUser } from '../auth/authMiddleware.js'

router
    .get('/', getUsers)

    .delete('/:id', deleteUser)

    .get('/currentUser', getUser, currentUser)

    .post('/', createUser)

    .post('/login', login)

    .get('/logout', logout)

    .delete('/', deleteUsers)

export default router