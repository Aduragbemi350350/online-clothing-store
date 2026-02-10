import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ["user", "admin"]},
    password: {type: String, require: true},
    otp: String,
    otpExpiresAt: Number,
    verified: {type: Boolean, default: false},
    createdOtpAt: {type: Date}
})

const User = mongoose.model("User", userSchema)

export default User