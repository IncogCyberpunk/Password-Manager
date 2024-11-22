import express from "express";
import dotenv from "dotenv";
import path from "path";


import connectToMongoDB from "./db/connectToMongoDb.js";

import authRoutes from "./routes/auth.routes.js"
import authenticateJWT from "./middlewares/authenticateJWT.js";

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
        res.status(200).json({
            "message":"hello aayush"
    })
})
*/

app.use(express.json());
app.disable("x-powered-by");

  
const port=process.env.PORT || 3000


// CUSTOM MIDDLEWARES FOR ROUTES
app.use("/api/auth",authRoutes);


app.get("/",(req,res) => {
    res.send("Hello World");
})

app.listen(port,() => {
    connectToMongoDB();
    console.log(`Server running at port ${port}`);
})


// need to create refresh token and access token frontend
// refresh token backend and refresh mechanism