import Token from "../../models/token.models.js"

const logout = async (req, res) => {
    try {
        const { _userId } = req.body;
        const { refreshToken } = req.cookies;

        //findOneandUpdate also performs the same, but it returns a document whereas updateOne method doesn't , reducing response time and saving bandwidth
        try {
            await Token.updateOne({ _userId }, { $pull: { refreshTokens: refreshToken } })

            // let existingToken = await Token.findOne({_userId})
            // existingToken.refreshTokens = existingToken.refreshTokens.filter(
            //     (token) => (token !== refreshToken)
            // );
            // console.log(existingToken.refreshTokens)
            console.log('Removed the refresh token from db')
            res.status(200).clearCookie("refreshToken", {
                httpOnly: true,
                // sameSite if enabled in development creates problems during developing
                sameSite: "Strict",
                secure: process.env.NODE_ENV === "production" ,
            }).json({ successMessage: "Logged Out Successfully" })
        } catch (error) {
            console.log("Error removing the refreshToken during logout")
            console.log(error)
            return;
        }
    } catch (error) {
        console.log(`Error logging out` + error)
        res.status(500).json({
            "errorMessage": "Internal Server Error !! Log-out failed"
        })
    }
}

export default logout