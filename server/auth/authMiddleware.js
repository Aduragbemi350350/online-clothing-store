import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import errorHandler from '../utilities/errorHandler.js'


//user middleware
export async function authMiddleWare(req, res, next) {
    try {
        //get token from client header
        const token = req.cookies.userToken

        //show token
        console.log({ mess: "Get token from client header", token })

        //check token
        if (!token) {
            //show result
            console.log({ mess: "There's no token!"})
            return res.status(401).json({ mess: "Please, login to continue!" })
        }

        //verify token
        const userVerified = jwt.verify(token, process.env.SECRET_KEY)

        //check if token in correct/valid
        if (!userVerified) {
            console.log({ mess: "Token verification failed. User isn't valid!" })
            res.status(401).json({ mess: "Invalid User! Try to login again." })
            return
        } else {
            const user = await User.findById(userVerified.id)
            req.user = user
            next()
        }
    } catch (error) {
        console.log({ mess: "An error occured while verifying user!" })
        const err = errorHandler(error)
        res.status(500).json({ mess: err })
    }
}

export const getUser = async (req, res, next) => {
    try {
        const token = req.cookies.userToken
        const userVerified = jwt.verify(token, process.env.SECRET_KEY)
        if (!userVerified) {
            console.log({ "Getting user": "User isn't signed in" })
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

//user utilities
export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1d" })
    console.log({ "Generated token": token })

    if (!token) {
        console.log({
            mess: "Token wasn't generated!"
        })
        throw new Error("Token wasn't generated!")
    }

    return token
}

