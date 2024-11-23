import mongoose from "mongoose"

const tokenSchema = new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        unique: true,
        required: true,
    },
    refreshTokens:{
        // saying that refreshToken is an array of string values
        default: [],
        type: Array,
        required: true
    }
},{timestamps: true})

const Token = mongoose.model("tokens",tokenSchema)

export default Token;