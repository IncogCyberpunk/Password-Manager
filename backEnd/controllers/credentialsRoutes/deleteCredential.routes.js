import Credentials from "../../models/credentials.models.js"


const deleteCredential = async (req, res) => {
    const { userId, credentialId } = req.body;

    try {
        await Credentials.updateOne({ _userId: userId }, {
            $pull: { storage: {_id:credentialId} }
        })

        return res.status(201).json({"successMessage":"Deleted the credential successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"errorMessage":"Error deleting the credential"})
    }
};


export default deleteCredential
