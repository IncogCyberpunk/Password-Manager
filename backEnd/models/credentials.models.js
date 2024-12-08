import mongoose from "mongoose"

const credentialsSchema=new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true,
    },
    storage: [
        {
            websiteName: { type: String, required: true },
            loginEmail: { type: String, required: true },
            loginPassword: { type: String, required: true },
        },
    ],
})

const Credentials = new mongoose.model("userCredentials",credentialsSchema)

export default Credentials;