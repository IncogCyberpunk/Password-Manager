import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAccessStatusContext } from "../context/accessStatus.context";
import { useActionStatusContext } from "../context/actionStatus.context";


let fetchUrl;
if (import.meta.env.VITE_ENV === "development") {
  fetchUrl = "http://localhost:5000/api/auth/login"
}
else {
  fetchUrl = "/api/auth/login"
}


const useLogin = () => {
  const {  accessStatus,setAccessStatus } = useAccessStatusContext();
  const {actionStatus,setActionStatus}= useActionStatusContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const login = async (finalLoginData) => {
    setError(null);

    let fieldA;
    let requestObject = {};

    try {
      let email, username, password;

      if (finalLoginData.hasOwnProperty("email")) {
        email = finalLoginData.email;
        password = finalLoginData.password;
        fieldA = "email";
        requestObject = { email, password };
      } else if (finalLoginData.hasOwnProperty("username")) {
        username = finalLoginData.username;
        password = finalLoginData.password;
        fieldA = "username";
        requestObject = { username, password };
      }

      console.log("request object is", requestObject);

      // Check if the fields are empty
      if (fieldA === "email") {
        checkField(email, password);
      } else {
        checkField(username, password);
      }

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestObject),
      });

      const data = await response.json();

      if (data.successMessage) {
        toast.success("Logged In Successfully");
        localStorage.setItem("accessToken", data.accessToken);

        setAccessStatus(true)
        setActionStatus(true)
        
        setTimeout(() => {
          toast.success("Redirecting to Add Credentials")
          navigate("/vault")
        }, 750);
      } else if (data.errorMessage && data.errorMessage.toLowerCase().includes("no such user")) {
        toast.error(data.errorMessage);
        setError(data.errorMessage);
      } else {
        toast.error(data.errorMessage);
        setError(data.errorMessage);
      }

      
    } catch (error) {
      if (error.message) {
        console.error("Error during login:", error);
      }
      else {
        toast.error("An unexpected error occurred");
        setError("An unexpected error occurred");
      }
    }
  };

  function checkField(fieldA, password) {
    if (!fieldA || !password) {
      const errorMsg = "Fields cannot be empty";
      toast.error(errorMsg);
      throw Error(errorMsg);
    }
  };

  return { login, error };
};

export default useLogin;
