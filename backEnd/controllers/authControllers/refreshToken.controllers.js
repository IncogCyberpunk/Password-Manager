import jwt from "jsonwebtoken";
import { generateAccessJWT, generateRefreshJWT } from "../../utils/jwtTokens/generateJWT.js";
import authenticateJWT from "../../middlewares/authenticateJWT.js";

const refreshToken = async (req, res) => {
    //
    //
    // NEED TO INTRODUCE CODE TO WATCH OUT FOR EXPIRATION OF ACCESS TOKENS AND REDIRECT THEM TO REFRESH TOKENS ROUTE
    //
    //
    try {
        const payload=authenticateJWT(req,res,refresh);

        const newAccessToken= jwt.generateAccessJWT(payload);

        res.status(201).json({
            "message":"Success refreshing the access token",
            "accessToken":newAccessToken
        })
    } catch (error) {
        console.log(`Error refreshing the token`+error)
        return res.status(500).json({
            "message":"Internal Server Error"
        })
    }
};


export default refreshToken
