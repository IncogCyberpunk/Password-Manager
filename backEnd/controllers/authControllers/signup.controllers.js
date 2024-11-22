import User from "../../models/users.models.js";
import HashPassword from "../../utils/passwordUtils/hashPassword.js";
import generateJWT from "../../utils/generateJWT.js";
import authenticateJWT from "../../middlewares/authenticateJWT.js";

const signUp= async (req,res) => {
    try {
        let {fullName ,username,password,confirmPassword,email,gender}= req.body;
        

        fullName=fullName.trim();
        username=username.trim();
        email=email.trim();
        gender = gender.toLowerCase();

        if (password != confirmPassword){
            return res.status(400).json({
                "error": "Passwords do not match"
            })
        }


        let existingUser= await User.findOne({username,email});

        if(existingUser){
            return res.status(400).json({
                "error":"User already exists !! Please login "
            })
        }

        const hashedPassword=await HashPassword(password);

        const newUser = new User({ fullName, username, password:hashedPassword, email ,gender});
        await newUser.save();

        const payload={
            _id:newUser._id,
            username,
        }
        const claims={
            "expiresIn":"60m",
        }
        let accessToken = generateJWT(payload,process.env.ACCESS_TOKEN_SECRET,claims);

        res.status(201).json({
            message: "SignUp Successful",
            // better practice to use the newUser object's data as this is the final data saved 
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            gender: newUser.gender,
            accessToken,
        })
        console.log(`Signup successful and user added to the database`)
    } catch (error) {
        console.log(`Error was occured `)
        console.log(error)  
        return res.status(400).json({
            "message":"Error performing signup"
        })
    }
}

export default signUp