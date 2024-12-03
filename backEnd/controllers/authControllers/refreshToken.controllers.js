import jwt from "jsonwebtoken";
import { generateAccessJWT, generateRefreshJWT } from "../../utils/jwtTokens/generateJWT.js";
import {authenticateRefreshJWT} from "../../middlewares/authenticateJWT.js";

const refreshToken = async (req, res) => {
    
    try {
        const payload=authenticateRefreshJWT(req,res);

        const newAccessToken= generateAccessJWT(payload);

        res.status(201).json({
            "message":"Success refreshing the access token",
            "accessToken":newAccessToken
        })
    } catch (error) {
        console.log(`Error refreshing the token `+error)
        return res.status(500).json({
            "message":"Internal Server Error"
        })
    }
};


export default refreshToken
