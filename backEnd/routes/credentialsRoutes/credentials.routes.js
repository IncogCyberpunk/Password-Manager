import express from "express";
import retrieveCredentials from "../../controllers/credentialsRoutes/retrieveCredentials.controller.js";
import storeCredentials from "../../controllers/credentialsRoutes/storeCredentials.controller.js";
import {authenticateAccessJWT,authenticateRefreshJWT} from "../../middlewares/authenticateJWT.js";

// const Router=express.Router({caseSensitive: true});
const Router=express.Router();


Router.post('/retrievecredentials',authenticateAccessJWT,retrieveCredentials);
Router.post('/storecredentials',authenticateAccessJWT,storeCredentials);

export default Router;