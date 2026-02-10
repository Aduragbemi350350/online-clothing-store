import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../auth/authMiddleware.js"
import errorHandler from "../utilities/errorHandler.js"
import { generateOTPMail, otpGenerator, sendUserOTP } from "../auth/emailVerification.js"
import generateRandomNo from "../utilities/generateRandomNo.js"
import generateExpiryTime from "../utilities/generateExpiryDate.js"

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

        //check if user email already exists
        const registeredUser = await User.findOne({ email })
        if (registeredUser) {
            const error = {
                name: "MongoServerError",
                message: "User with this email already exist!",
                status: 400
            }
            console.log({
                mess: "Signup error. User with this email already exist!"
            })
            res.status(400).json(error)
            return
        }

        const user = await User.create(userDetails)

        //Generate and update user object
        user.otp = otpGenerator.otp
        user.otpExpiresAt = otpGenerator.otpExpiresAt
        user.createdOtpAt = Date.now()

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

        if (response) {
            await user.save()
            console.log({
                mess: "There's a response, user has been saved"
            })
        }

        console.log({
            mess: "New user signed up",
            user
        })
        res.status(200).json({
            mess: "Mail created",
            mail,
            user
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

        if (!email || !password) {
            console.log({ noContent: "At least on the required parameter was available!" })
            return res.status(401).json({ noContent: "At least on the required parameter was available!" })
        }

        //check for email
        const user = await User.findOne({ email })

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
            console.log({
                noUser: "Email or password incorrect!"
            })
            res.status(401).json({ mess: "Email or password incorrect!" })
            return
        }

        if (!user?.verified) {
            console.log({
                mess: "User hasn't been verified! Request for new OTP!"
            })
            res.status(401).json({ mess: "User hasn't been verified! Request for new OTP" })
            return
        }

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

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp, password } = req.body

        //check req body
        if (!email || !otp) {
            console.log({
                mess: "No email or otp!",
            })
            res.status(400).json({
                mess: "No email or otp!",
            })
            return
        }

        const user = await User.findOne({ email })

        //check user
        if (!user) {
            console.log({
                mess: "There's no user with this email, process to signup",
            })
            res.status(400).json({
                mess: "There's no user with this email, process to signup",
            })
            return
        }

        //verify user password
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            console.log({
                mess: "Email or Password incorrect, try again!",
            })
            res.status(400).json({
                mess: "Email or Password incorrect, try again!",
            })
            return
        }

        //check if user had been verified
        if (!user.verified) {
            //check if otp is valid or expired
            if (user.otpExpiresAt < Date.now()) {
                console.log({
                    mess: "OTP is expired, request for new otp",
                })
                res.status(400).json({
                    mess: "OTP is expired, request for new otp",
                })
                return
            }

            //check if otp is the same or valid
            if (user.otp === otp) {
                user.verified = true

                console.log({
                    mess: "OTP validated, proceed to sign in",
                    user
                })

                await user.save()

                res.status(200).json({
                    mess: "OTP validated, proceed to sign in",
                    user
                })

                return
            } else {
                res.status(400).json({
                    mess: "OTP isn't validated, wrong otp",
                    user
                })
            }

        } else {
            res.status(200).json({
                mess: "User is verified, process to login",
            })
        }

    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Current user error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

export const requestOTP = async (req, res) => {
    try {
        const { email, password } = req.body

        //verify email
        if (!email || !password) {
            console.log({
                mess: "No email or otp!",
            })
            res.status(400).json({
                mess: "No email or otp!",
            })
            return
        }

        const user = await User.findOne({ email })

        //check user
        if (!user) {
            console.log({
                mess: "There's no user with this email, process to signup",
            })
            res.status(400).json({
                mess: "There's no user with this email, process to signup",
            })
            return
        }

        //verify user password
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            console.log({
                mess: "Email or Password incorrect, try again!",
            })
            res.status(400).json({
                mess: "Email or Password incorrect, try again!",
            })
            return
        }


        //check if user had been verified
        if (!user.verified) {
            //check if otp hasn't been sent before within the range of 1min
            const oneMinute = 60 * 1000
            if (Date.now() < (new Date(user.createdOtpAt).getTime() + oneMinute)) {
                console.log({
                    mess: "OTP can't be sent until after 1 min",
                })
                res.status(400).json({
                    mess: "OTP can't be sent until after 1 min",
                })
                return
            }

            //generate new otp
            user.otp = generateRandomNo(6)  //6 is the number of digit
            user.otpExpiresAt = generateExpiryTime(20) //20 is the number of time in minutes
            user.createdOtpAt = Date.now()

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

            //save user
            user.save()

            console.log({
                mess: "OTP sent to user",
                response
            })
            res.status(200).json({
                mess: "OTP sent to user, process to OTP verification",
            })
            return
        } else {
            res.status(200).json({
                mess: "User is verified, process to login",
            })
        }

    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Current user error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}