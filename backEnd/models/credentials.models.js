import mongoose from "mongoose"

const credentialsSchema=new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true,
    },
    storage: {
        type:Array({
            type: Map,
            of: String,
        })
    },
})

const Credentials = new mongoose.model("userCredentials",credentialsSchema)

export default Credentials;