const logout= (req,res) => {
    try {

        res.status(200).json({message: "Logged OUt Successfully"})
    } catch (error) {
        console.log(`Error logging out`+error)
        res.status(500).json({
            "message":"Internal Server Error !! Log-out failed"
        })
    }
}

export default logout