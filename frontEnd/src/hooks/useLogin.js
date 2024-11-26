import toast from "react-hot-toast"

const useLogin =async (finalLoginData) => {
  
    let fieldA;
    let requestObject={}
    try {
        let email,username,password;
    if(finalLoginData.hasOwnProperty("email")){
        email=finalLoginData.email;
        password=finalLoginData.password;
        fieldA="email";
        requestObject={...requestObject,email,password}
    }
    else if(finalLoginData.hasOwnProperty("username")){
        username=finalLoginData.username;
        password=finalLoginData.password;
        fieldA="username"
        requestObject=({...requestObject,username,password})
    }

    console.log("request object is ",requestObject)

    // check if the fields are empty or not
    if(fieldA==="email"){
        checkField(email,password);
    }
    else {
        checkField(username,password);
    }

    const data=await fetch("http://localhost:5000/api/auth/login",{
        "method":"POST",
        "headers":{
            "Content-Type":"Application/json",

        },
        "credentials": "include",
        "body": JSON.stringify(requestObject),
    })

    const response = await data.json();
    console.log(response)
    if(response.message==="Success logging in"){
        localStorage.setItem("accessToken",response.accessToken)
    }


    } catch (error) {
        console.log(`Error performing login`+error)    
    }
};

function checkField(fieldA,password){
    if(fieldA === "" || password ===""){
        toast.error("Fields cannot be empty")
        return
    }

}


export default useLogin
