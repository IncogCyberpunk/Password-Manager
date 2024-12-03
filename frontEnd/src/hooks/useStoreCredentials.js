import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserIdContext } from "../context/userId.context";
import { useSubmitStatusContext } from "../context/submitStatus.context";
import toast from "react-hot-toast";
import validateEmail from "../utilities/validateEmail.js";



// creating a broadcast channel using BroadCast WEB API to share the `submitStatus` across tabs/windows
const broadcastChannel=new BroadcastChannel("submitStatusChannel")

export default function useStoreCredentials() {
  const { submitStatus,setSubmitStatus } = useSubmitStatusContext();
  
  const _userId = useUserIdContext();
  const navigate=useNavigate();

  const storeCredentials = async (credentials) => {
    const { websiteName, loginEmail, loginPassword } = credentials;

    if (!websiteName || !loginEmail || !loginPassword) {
      toast.error("Fields cannot be empty");
      return Promise.reject("Validation failed");
    }

    if (!validateEmail(loginEmail)) {
      toast.error("Please enter a valid email");
      return Promise.reject("Invalid email format");
    }

    const finalObject = { ...credentials, _userId };
    console.log(`The final object is:`, finalObject)

    try {
      const request = await fetch("http://localhost:5000/api/storage/storecredentials", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(finalObject),
      });
      
      const response = await request.json();
      console.log(response)
      if (response.successMessage) {
        toast.success("Successfully added credentials to the vault.");
        setSubmitStatus(true);
        
        // broadcast the updated submitStatus
        broadcastChannel.postMessage({submitStatus:true})
        console.log(`the submit status is ${submitStatus}`)
        return Promise.resolve(response);
      }
      
      else if (response.errorMessage.toLowerCase().includes(("token expired") || ("you are not a valid user"))) {
        toast.error(response.errorMessage);
        setTimeout(() => {
          navigate("/login")
        }, 2000)
        return Promise.reject(response.errorMessage)
      }

      else {
        toast.error("Failed to store credentials.");
        return Promise.reject(response.errorMessage || "Failed to store credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error storing the credentials.");
      return Promise.reject(error);
    }
  };

  return {storeCredentials,submitStatus,setSubmitStatus};
}
