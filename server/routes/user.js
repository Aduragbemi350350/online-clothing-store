import express from 'express'
const router = express.Router()

import User from '../models/User.js'

router.get('/', async(req, res)=>{

    try {
        const users = await User.find()

        console.log(users)
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res)=>{
    const {username, email, role} = req.body
    const user = {
        username,email,role
    }

    const newUser = await User.create(user)

    console.log(newUser)
    res.json(newUser)
})

export default router