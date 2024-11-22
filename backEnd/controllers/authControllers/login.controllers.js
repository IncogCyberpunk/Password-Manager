import User from "../../models/users.models.js";
import ErrorCounter  from "../../utils/errorCounter/loginErrorCounter.js";
import checkPassword from "../../utils/passwordUtils/checkPassword.js";
import authenticateJWT from "../../middlewares/authenticateJWT.js";

const login = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;

        let userExists;

        if (username?.trim()) {
            try {
                if(username?.trim().includes("@gmail.com")){
                    throw Error()
                }
                userExists = await User.findOne({ username });
            } catch (error) {
                console.log("Email cannot be a username")
                return res.status(400).json({ "message": "Please enter a valid username"})
            }
        } else if (email?.trim()) {
            userExists = await User.findOne({ email });
            console.log(userExists)
        }

        if (!userExists) {
            ErrorCounter(true);
            return res.status(400).json({
                error: "No such user !!",
            });
        }

        // return ensures execution is stopped after the later part code is done
        return await checkPassword(password, userExists.password, res);
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

export default login;
