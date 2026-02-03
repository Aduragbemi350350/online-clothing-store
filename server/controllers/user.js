import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateToken } from "../auth/authMiddleware.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        console.log({ mess: users })
        res.status(200).json({ mess: users })
    } catch (error) {
        console.log({ mess: error.message })
        res.status(500).json({ mess: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body
        const password = await bcrypt.hash(req.body.password, 10)

        if (!username || !email || !password) return res.status(401).json({ mess: "Make sure you input all field and try again!" })

        const userDetails = { username, email, password }

        const user = await User.create(userDetails)

        console.log({ mess: user })
        res.status(200).json({ mess: user })
    } catch (error) {
        console.log({ mess: error.message })
        res.status(500).json({ mess: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log({ "This is the user login details": req.body })
        if (!email || !password) {
            console.log({ noContent: "At least on the required parameter was available!" })
            return res.status(401).json({ noContent: "At least on the required parameter was available!" })
        }

        //check for email
        const user = await User.findOne({ email })
        console.log({ "Login user": user })

        if (!user) {
            console.log({
                noUser: "User doesn't exist, you can process to registration!"
            })
            return res.status(401).json({
                noUser: "User doesn't exist, you can process to registration!"
            })
        }
        //confirm user's password
        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            res.status(401).json({ mess: "Email or password incorrect!" })
            return
        } else {
            //generate token
            const token = generateToken(user._id)

            console.log({ "Token generated during login": token })
            //save the token in the user browser
            res
                .cookie(
                    "userToken",
                    token,
                    {
                        httpOnly: false,
                        sameSite: "lax",
                        secure: false
                    }
                )
                .status(200)
                .json(user)
        }
    } catch (error) {
        console.log({ "Login error message": error.message })
        res.status(401).json({ "Login error message": error.message })
    }
}

export const logout = (req, res) => {
    try {
        res
            .clearCookie("userToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: false
            })
            .status(200)
            .json({ "logout message": "Log out!" })

        console.log("Cookie cleared!")
    } catch (error) {
        console.log({ "logout error message": error.message })
        res.status(401).json({ "logout error message": error.message })
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await User.deleteMany()
        res.status(200).json({ "delete all users": "Users deleted!" })
    } catch (error) {
        console.log({ "delete all users error": error.message })
        res.status(401).json({ "delete all users error": error.message })
    }
}

export const currentUser = async (req, res) => {
    try {
        const user = req.user
        console.log({currentUser: user})

        const currentUser = {
            _id: user._id,
            name: user.username,
            email: user.email
        }

        if (!currentUser) return console.log("User isn't logged in yet!")
        res.status(200).json(currentUser)
    } catch (error) {
        console.log({ "Get current user": error.message })
        res.status(401).json({ "Get current user": error.message })
    }
}