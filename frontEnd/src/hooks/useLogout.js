import { useUserIdContext } from "../context/userId.context";

export default function useLogout(){
       const _userId=useUserIdContext();

       const performLogout = async() => {
            try {
                const data=await fetch("http://localhost:5000/api/auth/logout",{
                    method: "POST",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({_userId})
                });
                const response=await data.json();

                if(response.errorMessage){
                     toast.error(response.errorMessage)
                     return Promise.reject("Unable to logout");
                }
                else{
                    toast.success(response.successMessage)
                    return Promise.resolve(response.successMessage)
                }
            } catch (error) {
                
            }
       };
       
       return performLogout;
     
}