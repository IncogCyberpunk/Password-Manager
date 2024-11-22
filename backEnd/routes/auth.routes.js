import express from "express";
import login from "../controllers/authControllers/login.controllers.js";
import logout from "../controllers/authControllers/logout.controllers.js";
import signup from "../controllers/authControllers/signup.controllers.js";

// express routes are case-insensitive by default,  caseSensitive: true  used to make it caseSensitive 
// const Router=express.Router({caseSensitive: true});
const Router=express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/logout",logout)


export default Router;