import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


let fetchUrl;
if (import.meta.env.VITE_ENV === "development") {
  fetchUrl = "http://localhost:5000/api/auth/refresh-token"
}
else {
  fetchUrl = "/api/auth/refresh-token"
}



export default function RenewToken() {
  const navigate = useNavigate();

  const handleTokenRenewal = async () => {
    try {
      const response = await fetch(fetchUrl, {
      // const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to renew token");
      }

      const { accessToken } = await response.json();
      localStorage.setItem("accessToken", accessToken);
      toast.success("Token renewed successfully!");
      navigate("/"); // Redirect to the home page or dashboard
    } catch (error) {
      console.error("Error renewing token:", error);
      toast.error("Failed to renew token. Please log in again.");
      navigate("/login"); // Redirect to login if renewal fails
    }
  };

  return (
    <div>
      <h1>Renew Your Token</h1>
      <button onClick={handleTokenRenewal}>Renew Token</button>
    </div>
  );
}
