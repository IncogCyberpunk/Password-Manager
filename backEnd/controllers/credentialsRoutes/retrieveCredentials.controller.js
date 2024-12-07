import Credentials from "../../models/credentials.models.js";

export default async function retrieveCredentials(req, res) {
      const { _userId } = req.body;
      try {
            // `select("storage -_id")` selects only the storage field and excludes the _id property given by mongoDB
            const allCredentialsArray = await Credentials.find({ _userId }).select("storage -_id");
            if(allCredentialsArray.length > 0){
                  return res.status(200).json(allCredentialsArray);
            }
            else{
                  return res.status(200).json({"successMessage":"no credentials"})
            }
      } catch (error) {
            console.log(error)
            return res.status(500).json({"errorMessage":"Internal Server Error"});
      }
}