import toast from "react-hot-toast";

import { useAccessStatusContext } from "../context/accessStatus.context";
import { useActionStatusContext } from "../context/actionStatus.context";

let fetchUrl;
if (import.meta.env.VITE_ENV === "development") {
  fetchUrl = "http://localhost:5000/api/manager/deletecredential"
}
else {
  fetchUrl = "/api/manager/deletecredential"
}


export default function useDeleteCredentials(){
     const {userId}=useAccessStatusContext();
     const {setActionStatus}= useActionStatusContext();
       
     const performDelete =async (credentialId) => {
        const data= await fetch(fetchUrl,{
          method: "POST",
          credentials: "include",
          headers:{
               "Content-Type":"application/json",
               "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          },
          body: JSON.stringify({userId,credentialId})
        });

        const response=await data.json();

        if(response.errorMessage){
          toast.error("Error deleting the credential")
          return Promise.reject("Error deleting the credentials")
        }

        if(response.successMessage){
          toast.success("Deleted the credential")
          setActionStatus(true);
          return Promise.resolve("Deleted the credential successfully")
        }
     };
     
     return {performDelete}
}