import { useState, useContext, createContext, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

import { useActionStatusContext } from "./actionStatus.context";

export const accessStatusContext = createContext();

export const useAccessStatusContext = () => {
  return useContext(accessStatusContext);
};

export const AccessStatusProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessStatus, setAccessStatus] = useState();

  const { actionStatus } = useActionStatusContext();
  const initalMonitor = useRef(true);

  // useEffect to perform the side effect of monitoring the access token
  useEffect(() => {
    if (actionStatus || initalMonitor.current) {
      initalMonitor.current = false;
      monitorAccessJWT(setUserId,setAccessStatus);
    }
  }, [actionStatus]); // Dependency array ensures this runs only on mount

  return (
    <accessStatusContext.Provider value={{ accessStatus,setAccessStatus, userId }}>
      {children}
    </accessStatusContext.Provider>
  );
};

function monitorAccessJWT(setUserId,setAccessStatus){
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.log("No access token found in localStorage");
    setAccessStatus(false);
    setUserId(null);
    return;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const userId = decoded._id;
    setUserId(userId);

    console.log(`The userId is ${userId}`);
    const { exp: expiryTime } = decoded;
    const readableExpiryTime = new Date(expiryTime * 1000).toLocaleString();
    console.log(`Token expires at: ${readableExpiryTime}`);

    const currentTime = Math.floor(Date.now() / 1000);
    const renewalTime = expiryTime - currentTime - 60; // Renew 1 minute before expiry

    console.log(`Token is to be renewed in: ${renewalTime} seconds`);

    if (renewalTime > 0) {
      setAccessStatus(true);
      // setTimeout(requestRenewal, renewalTime * 1000);
    } else {
      console.log("Token has already expired");
      setAccessStatus(false);
      setUserId(userId);
    }
  } catch (error) {
    console.error("Error decoding the access token: ", error);
    setAccessStatus(false);
    setUserId(null);
  }
};




async function requestRenewal() {
  try {
    const request = await fetch(
      "http://localhost:5000/api/auth/refresh-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Sends cookies
      },
    );

    if (!request.ok) {
      throw new Error("Failed to renew access token");
    }

    const returnedResponse = await request.json();
    const { accessToken } = returnedResponse;
    console.log(`The new access token is: ${accessToken}`);
    localStorage.setItem("accessToken", accessToken);

    // Restart monitoring with the new token
    monitorAccessJWT();
  } catch (error) {
    console.error("Error requesting renewal of the access token:", error);
    setAccessStatus(false);
    setUserId(null);
  }
}

