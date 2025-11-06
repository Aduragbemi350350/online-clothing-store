import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"]}
})

const User = mongoose.model("User", userSchema)

export default User