import User from "../../models/users.models.js";
import Token from "../../models/token.models.js";
import HashPassword from "../../utils/passwordUtils/hashPassword.js";

const signUp = async (req, res) => {
    try {
        let { fullName, username, password, confirmPassword, email, gender } = req.body;

        fullName = fullName.trim();
        username = username.trim();
        email = email.trim();
        gender = gender.toLowerCase();

        if (password != confirmPassword) {
            return res.status(400).json({
                "error": "Passwords do not match"
            })
        }


        let existingUser = await User.findOne({ email }) || await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                "errorMessage": "User already exists !! Please login "
            })
        }
        
        // hashing password
        const hashedPassword = await HashPassword(password);

        // creating a new user object
        const newUser = new User({ fullName, username, password: hashedPassword, email, gender });
        
        try {
            
            // Save user into the database iff , signup process is successful and token creation is also successful
            await newUser.save();
            console.log(`Signup successful and user added to the database`)
            
            //
            //
            // CREATE TOKENS ONLY AFTER LOGIN, AS THEY ARE USED FOR AUTHENTICATION, IF NOT CAN BE EXPLOITED BY HACKERS
            //
            //
            // let accessToken = generateAccessJWT(newUser);
            // let refreshToken = generateRefreshJWT(newUser);
            // const newRefreshToken= new Token({
            //     _userId: newUser._id,
            //     refreshTokens: refreshToken,
            // })
            // await newRefreshToken.save();
            // console.log(`Saved refresh token into the database`);

            
            return res.status(201).json({
                message: "SignUp Successful",
                // better practice to use the newUser object's data as this is the final data saved 
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                gender: newUser.gender,
            })

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                "error": "Error generating tokens"
            })
        }
    } catch (error) {
        console.log(`Error was occured `)
        console.log(error)
        return res.status(400).json({
            "error": "Error performing signup"
        })
    }
}

export default signUp