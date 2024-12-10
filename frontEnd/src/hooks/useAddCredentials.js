import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import validateEmail from "../utilities/validateEmail.js";

import { useSubmitStatusContext } from "../context/submitStatus.context.jsx";
import { useAccessStatusContext } from "../context/accessStatus.context.jsx";
import { useActionStatusContext } from "../context/actionStatus.context.jsx";


let fetchUrl;
if (import.meta.env.VITE_ENV === "development") {
  fetchUrl = "http://localhost:5000/api/manager/storecredentials"
}
else {
  fetchUrl = "/api/manager/storecredentials"
}


// creating a broadcast channel using BroadCast WEB API to share the `submitStatus` across tabs/windows

export default function useAddCredentials() {
  const broadcastChannel = new BroadcastChannel("submitStatusChannel")
  const { setActionStatus } = useActionStatusContext();
  const { submitStatus, setSubmitStatus } = useSubmitStatusContext();

  const { userId: _userId } = useAccessStatusContext();
  const navigate = useNavigate();

  const storeCredentials = async (credentials) => {
    const { websiteName, loginEmail, loginPassword } = credentials;

    if (!websiteName || !loginEmail || !loginPassword) {
      toast.error("Fields cannot be empty");
      return Promise.reject("Validation failed due to empty credentials");
    }

    if (!validateEmail(loginEmail)) {
      toast.error("Please enter a valid email");
      return Promise.reject("Invalid email format");
    }

    if(websiteName.length > 10){
      toast.error("Website Name is too long !!")
      return Promise.reject() 
  }

    const finalObject = { ...credentials, _userId };
    console.log(`The final object is:`, finalObject)

    try {
      const request = await fetch(fetchUrl, {
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

        broadcastChannel.postMessage({ submitStatus: true })
        console.log('Broadcasting submitStatus update');

        setActionStatus(true);

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
      else if(response.errorMessage.includes("Credentials already exist !!")){
        toast.error(response.errorMessage);
        return;
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

  return { storeCredentials, submitStatus, setSubmitStatus };
}
