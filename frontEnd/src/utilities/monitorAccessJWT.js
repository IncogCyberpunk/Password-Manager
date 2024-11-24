import { jwtDecode } from "jwt-decode";

const monitorAccessJWT = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.log("No access token found in localStorage");
    return;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const { exp: expiryTime } = decoded;
    const readableExpiryTime = new Date(expiryTime * 1000).toLocaleString(); //toLocaleString() converts the date object to a readable time
    console.log(`Token expires at: ${readableExpiryTime}`);

    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    const renewalTime = expiryTime - currentTime - 60; // Renew 1 minute before expiry

    console.log(`Token will be renewed in: ${renewalTime} seconds`);

    if (renewalTime > 0) {
      setTimeout(requestRenewal, renewalTime * 1000); 
    }
  } catch (error) {
    console.error("Error decoding the access token: ", error);
  }
};

async function requestRenewal() {
  try {
    const request = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sends cookies 
    });

    if (!request.ok) {
      throw new Error("Failed to renew access token");
    }

    const returnedResponse = await request.json();
    const { accessToken } = returnedResponse;
    console.log(`The new access token is: ${accessToken}`);

    //
    //
    // IF BETTER METHODS EXIST , FIND OUT
    //
    //
    localStorage.setItem("accessToken", accessToken);
    
    // You can trigger the renewal again if needed.
    monitorAccessJWT();  // restart the renewal monitoring for the new provided access  token, so that it gets silently renewed in the background , enhancing the user experience
  } catch (error) {
    console.error("Error requesting renewal of the access token:", error);
  }
}

export default monitorAccessJWT;
