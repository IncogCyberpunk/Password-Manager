import express from "express";
import login from "../../controllers/authControllers/login.controllers.js";
import logout from "../../controllers/authControllers/logout.controllers.js";
import signup from "../../controllers/authControllers/signup.controllers.js";
import refreshToken from "../../controllers/authControllers/refreshToken.controllers.js";

// express routes are case-insensitive by default,  caseSensitive: true  used to make it caseSensitive 
const Router=express.Router({caseSensitive: true});

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/logout",logout)

//route for refreshing access token
Router.post("/refresh-token",refreshToken)


export default Router;