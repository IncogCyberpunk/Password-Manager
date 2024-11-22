import jwt from "jsonwebtoken";


export default function generateJWT(payload, secret, claims) {
    try {
        const token = jwt.sign(payload, secret, claims)
        if (!token) throw Error;
        return token
    } catch (error) {
        throw Error(error);
    }
}