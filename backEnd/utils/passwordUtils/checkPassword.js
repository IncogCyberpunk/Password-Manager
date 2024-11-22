import bcryptjs from "bcryptjs"

const checkPassword = async (pass, hashPass,res) => {
    try {
        const correct = await bcryptjs.compare(pass, hashPass);
        if (correct) {
            console.log("Logged In Successfully")
            return res.status(200).json({
                "message": "Success logging in"
            })
        }
        else
        console.log("Incorrect Password")
            return res.status(400).json({
                "message": "Incorrect password"
            })
    } catch (error) {
        console.log("Error checking the password")
        console.log(error)

        return res.status(500).json({
            "message":"An error occured while checking the password"
        })
    }
};



export default checkPassword
