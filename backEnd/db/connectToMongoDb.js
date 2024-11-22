import mongoose from "mongoose";

export default async function connectToMongoDB(){
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`Connected to the database successfully`);
    } catch (err) {
        console.log(err)
        console.log(`Error connecting to the database`)
    }
}