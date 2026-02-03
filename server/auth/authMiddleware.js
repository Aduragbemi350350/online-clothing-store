import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { json } from "express"
import jwt from 'jsonwebtoken'
export async function authMiddleWare(req, res, next) {
    try {
        const token = req.cookies.userToken

        console.log({ "Token from the client:": token })

        if (!token) {
            console.log({ mess: "Login" })
            return res.status(401).json({ mess: "Login" })
        }

        const userVerified = jwt.verify(token, process.env.SECRET_KEY)

        if (!userVerified) {
            console.log({ mess: "Invalid User!" })
            res.status(401).json({ mess: "Invalid User!" })
            return
        } else {
            const user = await User.findById(userVerified.id)
            req.user = user
            next()
        }
    } catch (error) {
        console.log({ mess: error.message })
        res.status(500).json({ mess: error.message })
    }
}

export const getUser = async (req, res, next) => {
    try {
        const token = req.cookies.userToken
        const userVerified = jwt.verify(token, process.env.SECRET_KEY)
        if (!userVerified) {
            console.log({"Getting user": "User isn't signed in"})
            next()
        }
        const user = await User.findById(userVerified.id)
        req.user = user
        next()
    } catch (error) {
        req.error = { error: error.message }
        next()
    }
}


export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1d" })
    console.log({ "Generated token": token })

    if (!token) {
        console.log({ "Generate token": "There's no token generated" })
        res.status(400).json({ "Generate token": "There's no token generated" })
    }

    return token
}

