import bcryptjs from "bcryptjs";

const HashPassword = async (unhashedPassword) => {
    try {
        const generatedSalt= await bcryptjs.genSalt(10);
        const hash= await bcryptjs.hash(unhashedPassword, generatedSalt);
        return hash;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
};


export default HashPassword

// The bcryptjs.hash function is a Promise-based function, which means:

//     If the hashing process succeeds, the Promise resolves with the hash.
//     If an error occurs during hashing, the Promise is rejected with an error.

// In Promise-based functions, errors are already "thrown" by rejecting the Promise. You don't need to manually throw the error inside `.then`