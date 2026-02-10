import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../auth/authMiddleware.js"
import errorHandler from "../utilities/errorHandler.js"
import { generateOTPMail, otpGenerator, sendUserOTP } from "../auth/emailVerification.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        console.log({ mess: users })
        res.status(200).json({ mess: users })
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Get user error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body
        const password = await bcrypt.hash(req.body.password, 10)

        if (!username || !email || !password) return res.status(401).json({ mess: "Make sure you input all field and try again!" })

        const userDetails = { username, email, password }

        const user = await User.create(userDetails)

        //Generate and update user object
        user.otp = otpGenerator.otp
        user.otpExpiresAt = otpGenerator.otpExpiresAt

        //see user object
        console.log({
            mess: "Add OTP to user object",
            updatedUser: user
        })

        //create otp mail
        const mail = generateOTPMail(user)

        //see mail
        console.log({
            mess: "Mail created",
            mail
        })

        //send mail
        const response = sendUserOTP(mail)

        console.log({
            mess: "OTP sent to user",
            response
        })

        await user.save()
        console.log({
            mess: "New user signed up",
            user
        })
        res.status(200).json({
            mess: "Mail created",
            mail
        })
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Create user error",
            errMess: err
        })
        res.status(err.status).json(err)
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
        const err = errorHandler(error)
        console.log({
            mess: "Login error",
            errMess: err,
        })
        res.status(err.status).json(err)
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
        const err = errorHandler(error)
        console.log({
            mess: "Logout error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await User.deleteMany()
        res.status(200).json({ "delete all users": "Users deleted!" })
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Delete user error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        console.log({
            mess: "User deleted",
            user
        })
        res.status(200).json({
            mess: "User deleted",
            user
        })
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Current user error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

export const currentUser = async (req, res) => {
    try {
        const user = req.user

        const currentUser = await User.findById(user._id).select("password")

        console.log({
            mess: "Fetch the current user",
            currentUser: user
        })

        if (!currentUser) {
            const error = {
                name: "Document Not Found Error!",
                message: "User not found!",
                status: 400
            }
            return res.status(400).json(error)
        }

        res.status(200).json(currentUser)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Current user error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}