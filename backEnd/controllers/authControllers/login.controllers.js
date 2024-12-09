import User from "../../models/users.models.js";
import ErrorCounter from "../../utils/errorCounter/loginErrorCounter.js";
import checkPassword from "../../utils/passwordUtils/checkPassword.js";
import { generateAccessJWT, generateRefreshJWT } from "../../utils/jwtTokens/generateJWT.js";
import Token from "../../models/token.models.js";

const login = async (req, res, next) => {
    try {
        
        const { username, email, password } = req.body;

        let userExists;
        if (username?.trim()) {
            try {
                if (username?.trim().includes("@gmail.com")) {
                    throw Error()
                }
                userExists = await User.findOne({ username });
            } catch (error) {
                console.log("Email cannot be a username",error)
                return res.status(400).json({ "message": "Please enter a valid username" })
            }
        } else if (email?.trim()) {
            userExists = await User.findOne({ email });
        }

        if (!userExists) {
            // ErrorCounter(true, res);
            return res.status(404).json({
                "errorMessage":"No such user !!"
            })
        }

        const isPasswordValid = await checkPassword(password, userExists.password, res);
        if(!isPasswordValid){
            return res.status(400).json({
                "errorMessage": "Incorrect password"
            })
        }
        else{
            const accessToken = generateAccessJWT(userExists);
            const refreshToken = generateRefreshJWT(userExists);
            console.log("Logged In Successfully")

            const existingToken = await Token.findOne({ _userId: userExists._id });

            if (!existingToken) {
                const newToken = new Token({ _userId: userExists._id, refreshTokens: refreshToken })
                await newToken.save();
                console.log(`Saved a new refresh token to the database`)
            }
            else {
                await Token.updateOne({ _userId: userExists._id }, {
                    $push: { refreshTokens: refreshToken }
                })
                console.log(`Updated refreshTokens in the database`)
            }


            // after .json the control is gone , so .cookie before .json
            return res.status(200).cookie("refreshToken", refreshToken, {
                // ensures cookies cannot be accessed by JS
                httpOnly: true,
                // used to control whether cookies are to sent with cross-site requests, providing some protection against cross-site request forgery (CSRF) attacks
                sameSite: process.env.NODE_ENV==="development" ? "Lax" : "Strict",
                // `secure` flag is useful to transmit cookies only over HTTPS , preventing anyone from reading them by intercepting network trafic
                secure: process.env.NODE_ENV==="production",
                maxAge: 60 * 60 * 24 * 30 * 1000 // 30 days in milliseconds
            }).json({
                "successMessage": "Success logging in",
                "accessToken": accessToken,
            })
        }
    } catch (error) {
        console.error("Error during login:", error);

        return res.status(500).json({
            errorMessage: "Internal Server Error",
        });
    }
};

export default login;
