import mongoose from "mongoose";
import crypto from 'crypto'

const userSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },

    role: {
        type: String,
        default: "user"
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,




})


userSchema.methods.generateResetToken = async function () {
    let resetToken = crypto.randomBytes(16).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 15 * 60 * 60 * 1000

    return resetToken;
}


const User = mongoose.model("User", userSchema)


export default User