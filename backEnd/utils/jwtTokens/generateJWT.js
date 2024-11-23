import jwt from "jsonwebtoken";


export  function generateAccessJWT(user) {
    try {
        const {_id,username}=user
        const payload = {
            _id,
            username,
        }
        const claims = {
            "expiresIn": "30m",
        }
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, claims)
        if (!token) throw Error;
        return token
    } catch (error) {
        throw Error(error);
    }
}

export function generateRefreshJWT(user) {
    try {
        const {_id,username}=user
        const payload = {
            _id,
            username,
        }
        const claims={
            "expiresIn": "30d",
        }
        const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, claims)
        if (!token) throw Error;
        return token
    } catch (error) {
        throw Error(error);
    }
}