import bcryptjs from "bcryptjs"

const checkPassword = async (pass, hashPass,res) => {
    try {
        const correct = await bcryptjs.compare(pass, hashPass);
        if (correct) {
            return true
        }
        else
        console.log("Incorrect Password")
            return false
    } catch (error) {
        console.log("Error checking the password")
        console.log(error)

        return res.status(500).json({
            "errorMessage":"An error occured while checking the password"
        })
    }
};



export default checkPassword
