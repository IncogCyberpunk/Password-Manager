import toast from 'react-hot-toast';
import validateEmail from '../utilities/validateEmail';


const useSignup =async (signupData) => {
    const {fullName,email,username,password,confirmPassword,gender}= signupData;

    if(!checkFields(fullName,email,username,password,confirmPassword,gender))
        return;

    try {
        const data=await fetch("http://localhost:5000/api/auth/signup",{
            method: "POST",
            headers: {
                "Content-Type":"Application/json"
            },
            credentials: "include",
            body:JSON.stringify(signupData)
        });
        const response=await data.json();
        console.log("response is",response)
        if(response.errorMessage){
            toast.error(response.errorMessage);
            return;
        }
        else{
            toast.success("Signup Successful")
            setTimeout(() => {
                window.location.href="/login";
            }, 2000);
        }
        
    } catch (error) {
        console.log(error)
        toast.error("Error performing signup")
        return
    }
    

};

const checkFields = (fullName,email,username,password,confirmPassword,gender) => {
    if(fullName === ""|| email === ""|| username === ""||password === "" || confirmPassword === "" || !gender){
        toast.error("Please fill in all the fields")
        console.log("Please fill in all the fields")
        return false
    }
    if(password !== confirmPassword){
        toast.error("Passwords do not match ");
        return false
    }
    if(!validateEmail(email)){
        toast.error("Please enter a valid email address")
        return false
    }
    else return true
};


export default useSignup
