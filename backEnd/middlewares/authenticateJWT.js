import jwt from "jsonwebtoken";
import Token from "../models/token.models.js";

export const authenticateAccessJWT = (req, res, next) => {
    let type;
    // `req.headers['authorization']` is equivalent to `req.headers.authorization` as
    // Express automatically normalizes header names to lowercase
    const authHeader = req.headers.authorization;
    const incomingToken = authHeader?.split(" ")[1]; // authorization header in the format `Bearer ${accessToken}`

    jwt.verify(incomingToken, process.env.ACCESS_TOKEN_SECRET, (error) => {
        // use `throw error` instead of `throw Error(error)` because `throw error` retains properties of error like name,message,stack while the later doesn't
        if (error) {
            type = "Access";
            errorHandler(req,res,error,type)
        }
        else{
            next();
        }
    });

};


export function authenticateRefreshJWT(req, res) {
    let type;
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({
                message: "No Refresh Token Provided",
            });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error) => {
            if (error) {
                type = "Refresh";
                errorHandler(req,res,error,type);
            }
        });

    } catch (error) {
        console.log(error.message);
        errorHandler(req,res,error)
    }
}

const errorHandler = async (req,res,error,type=null) => {
    const { _userId } = req.body;

    if (error.name === "TokenExpiredError" && type ==="Refresh") {
        await Token.updateOne({ _userId }, {
            $pull: { refreshTokens: req.cookies.refreshToken },
        });

        return res.status(403).json({
            errorMessage: `${type} Token Expired ! Please Login`,
        });
    }

    if (error.name === "TokenExpiredError" && type=== "Access") {
        return res.status(403).json({
            errorMessage: `${type} Token Expired ! Please Login`,
        });
    }

    if (error.name === "JsonWebTokenError") {
        // Invalid Token: Due to mismatched signature
        return res.status(403).json({
            errorMessage: `Invalid ${type} token`,
        });
    }

    if (error.name === "NotBeforeError") {
        // Token is being used before its valid time
        return res.status(403).json({
            errrorMessage: "Token can't be used before the specified time",
        });
    }

    console.error(error);
    return res.status(403).json({
        errorMessage: "Authentication Failed",
    });
}

