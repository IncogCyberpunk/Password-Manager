import Credentials from "../../models/credentials.models.js";
import User from "../../models/users.models.js";
import HashPassword from "../../utils/passwordUtils/hashPassword.js";


export default async function storeCredentials(req, res) {

    try {
        const { websiteName, loginEmail, loginPassword, _userId } = req.body;

        const existingUser = await User.findOne({ _id: _userId });
        
        // dont hash the loginPassword of  credentials 
        // const hashedLoginPassword= await HashPassword(loginPassword)

        if (!existingUser) {
            return res.status(404).json({ "errorMessage": "You are not a valid user !! Please login" });
        }

        try {
            const existingCredentials = await Credentials.findOne({ _userId });
            if (!existingCredentials) {
                const newCredentials = new Credentials({
                    _userId,
                    storage: {
                        websiteName,
                        loginEmail,
                        loginPassword ,
                    }
                })
                await newCredentials.save();

                console.log(`Successfully stored new credentials into a new  credentials database for user`);
            }
            else {
                await Credentials.updateOne(
                    { _userId }, {
                    $push: {
                        storage: { websiteName, loginEmail, loginPassword }
                    }
                })
                console.log(`Stored new credentials in the existing database of user's credentials`)
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ "errorMessage": "Error saving the credentials" });
        }

        return res.status(201).json({ "successMessage": "Added items to the vault" })

    } catch (error) {
        console.log(error)

        return res.status(500).json({ errorMessage: "Couldn't save the credentials due to an error." });

    }
}