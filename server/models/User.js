import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"]},
    password: {type: String, require: true},
    otp: String,
    otpExpiresAt: Number,
    verified: {type: Boolean, default: false}
})

const User = mongoose.model("User", userSchema)

export default User