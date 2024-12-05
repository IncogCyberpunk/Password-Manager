import { useState } from "react";

import { useAccessStatusContext } from "../context/accessStatus.context";
import { useActionStatusContext } from "../context/actionStatus.context.jsx";


import toast from "react-hot-toast"

export default function useVault() {
  const { setActionStatus } = useActionStatusContext();
  const { userId: _userId } = useAccessStatusContext();
  const [retrievedCredentials, setRetrievedCredentials] = useState([])

  const retrieveCredentials = async () => {
    try {
      // const data = await fetch("http://localhost:5000/api/storage/retrievecredentials", {
      const data = await fetch("/api/storage/retrievecredentials", {
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
      else {
        setActionStatus(true)
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