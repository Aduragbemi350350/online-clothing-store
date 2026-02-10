import express from 'express'
import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')


const router = express.Router()
import { createUser, currentUser, deleteUser, deleteUsers, getUsers, login, logout, requestOTP, verifyOTP } from '../controllers/user.js'
import { getUser } from '../auth/authMiddleware.js'

router
    .get('/', getUsers)

    .get('/currentuser', getUser, currentUser)

    .get('/logout', logout)

    .post('/', createUser)

    .post('/verifyotp', verifyOTP)

    .post('/requestotp', requestOTP)

    .post('/login', login)

    .delete('/', deleteUsers)

    .delete('/:id', deleteUser)

export default router