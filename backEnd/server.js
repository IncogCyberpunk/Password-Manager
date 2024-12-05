import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser"
import cors from "cors"

import connectToMongoDB from "./db/connectToMongoDb.js";

import authRoutes from "./routes/authRoutes/auth.routes.js"
import credentialsRoutes from "./routes/credentialsRoutes/credentials.routes.js"

const app =express();

const __dirname=path.resolve();
dotenv.config({path: path.join(__dirname,"../.env")});

//express routes are case insensitive by default , but can be made sensitive by the following
/* this only works for routes defined in the same file as this app.set, 
if routes are on other file , doesn't work */
app.set('case sensitive routing', true);

// ↑↑↑↑↑  WORKS FOR THESE TYPES OF ROUTES  ↑↑↑↑↑
/* 
app.get("/aayush",(req,res) => {
    console.log(req.cookies)
    res.status(200).json({
        "message":"hello aayush"
})
})
*/

app.use(cookieParser())
app.use(express.json());
app.disable("x-powered-by");

  
const port=process.env.PORT || 5500


// SETTING UP CORS FOR ACCESS FROM FRONTEND DURING DEVELOPMENT
// app.use(cors())                  // if u want whole app to accept requests made from other origin(different domain) 
// const corsOptions={
//     origin:"http://localhost:3000",
//     methods: ['GET',"POST","PUT","DELETE"],
//     credentials:true, // allows cookies and credentials
// }

app.use(express.static(path.join("../frontEnd/dist")))

// CUSTOM MIDDLEWARES FOR ROUTES

//cors setup only needed during development
// app.use("/api/auth",cors(corsOptions),authRoutes);
app.use("/api/auth",authRoutes);

// routes for managind the details stored using password manager i.e. password of different websites
// app.use("/api/storage",cors(corsOptions),credentialsRoutes)
app.use("/api/storage",credentialsRoutes)

app.get("/",(req,res) => {
    res.send("Hello World");
})

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontEnd/dist/index.html"))
})

app.listen(port,() => {
    connectToMongoDB();
    console.log(`Server running at port ${port}`);
})


// need to create refresh token and access token frontend
// refresh token backend and refresh mechanism