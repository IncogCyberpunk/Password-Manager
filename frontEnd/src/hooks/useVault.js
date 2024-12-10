import { useState } from "react";
import toast from "react-hot-toast"

import { useAccessStatusContext } from "../context/accessStatus.context";
import { useActionStatusContext } from "../context/actionStatus.context.jsx";



let fetchUrl;
if (import.meta.env.VITE_ENV === "development") {
  fetchUrl = "http://localhost:5000/api/manager/retrievecredentials"
}
else {
  fetchUrl = "/api/manager/retrievecredentials"
}

export default function useVault() {
  const { userId: _userId } = useAccessStatusContext();
  const [retrievedCredentials, setRetrievedCredentials] = useState([])
  

  const retrieveCredentials = async () => {
    try {
      const data = await fetch(fetchUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ _userId }),
      });

      const response = await data.json();
      console.log("Response from server:", response);

      if (response.errorMessage) {
        toast.error(response.errorMessage);
        return null;
      }
      else if(response.successMessage?.includes("no credentials")){
        return null;
      }
      return response[0]?.storage || null;
    } catch (error) {
      console.error("Error retrieving credentials:", error);
      toast.error("Failed to retrieve credentials.");
      return null;
    }
  };

  return { retrieveCredentials, retrievedCredentials, setRetrievedCredentials }
}