import jwt from "jsonwebtoken";


export default function authenticateJWT(req, res, next) {
    try {
        // headers['authorization'] also correct but the one used below is also correct
        // express automatically normalized header names to lowercase, so authorization and Authorization are the same
        const authHeader = req.headers.authorization;
        const incomingToken = authHeader?.split(" ")[1];

        //If the incoming token is valid/successfully verified,jwt.verify returns the payload contained in the incomingToken from the client
        jwt.verify(incomingToken, process.env.ACCESS_TOKEN_SECRET, (error, decodedPayload) => {
            if (error) throw Error("Invalid Token");

            req.payload=decodedPayload;

            next();
        })
    } catch (error) {
        console.log(error.message)
        return res.status(403).json({
            "message": "Invalid Token"
        })
    }
}