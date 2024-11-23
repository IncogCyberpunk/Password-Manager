import jwt from "jsonwebtoken";

import Token from "../models/token.models.js";
import refreshToken from "../controllers/authControllers/refreshToken.controllers.js";

export default async function authenticateJWT(req, res, type) {
    //
    //
    //
    // USE REACT TO PROVIDE THE ._id OF THE CLIENT TO UPDATE THE REFRESH TOKENS IN DATABASE AS OTHERWISE IT CAN'T BE GIVEN TO THE LOGOUT ROUTE
    //
    //
    //
    const { _userId } = req.body
    let tokenName;
    try {
        type.toLowerCase();
        if (type === "access") {
            tokenName = `accessToken`;
            // headers['authorization'] also correct but the one used below is also correct
            // express automatically normalized header names to lowercase, so authorization and Authorization are the same
            const authHeader = req.headers.authorization;
            const incomingToken = authHeader?.split(" ")[1];

            //If the incoming token is valid/successfully verified,jwt.verify returns the payload contained in the incomingToken from the client
            jwt.verify(incomingToken, process.env.ACCESS_TOKEN_SECRET, (error, decodedPayload) => {
                if (error) throw Error("Invalid Token");

                // req.payload = decodedPayload;
            })
        }

        else if (type === "refresh") {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                return res.status(401).json({
                    "message": "No Refresh Token Provided"
                })
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decodedPayload) => {
                if (error)
                    throw Error("Problem with the token");

                return decodedPayload
            })
        }

    } catch (error) {
        console.log(error.message)
        if (error.name === "TokenExpiredError") {
            // removing the expired refresh token from the database
            // await Token.updateOne({_userId},{
            //     $pull : {refreshTokens: refreshToken}
            // })

            // easier method
            const existingToken= await Token.findOne({_userId});
            existingToken.refreshTokens= existingToken.refreshTokens.filter((item) => item !== refreshToken)

            return res.status(403).json({ "message": `${tokenName} Expired !! Please Login` })
        }
        if (error.name === "JsonWebTokenError") {
            //
            // INVALID TOKEN MEANS THE SIGNATURE DOESN'T MATCH , SO REDIRECT TO LOGIN FROM FRONTEND
            //
            return res.status(403).json({ "message": `Invalid ${tokenName}` })
        }
        if (error.name === "NotBeforeError") {
            return res.status(403).json({ "message": "Token can't be used before the specified time" })
        }
        return res.status(403).json({
            "message": "Authentication Failed"
        })
    }
}