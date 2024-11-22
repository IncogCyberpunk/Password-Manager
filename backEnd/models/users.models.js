import mongoose from "mongoose";
//validator is used here for email validation
import validator from "validator"

const userSchema = new mongoose.Schema({
    fullName: {
        required: true,
        type: String,
        trim:true,
    },
    username:{
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        unique:true,
        trim: true,
        validate:{
            validator: (value)=> validator.isEmail(value),
            message: "Invalid email address"
        }
    },
    gender: {
        required: true,
        type: String,
        enum: ['male','female','others']
    }
},{timestamps: true})

const User= mongoose.model("users",userSchema);

export default User;