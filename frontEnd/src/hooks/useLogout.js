import { useNavigate } from "react-router-dom";
import { useAccessStatusContext } from "../context/accessStatus.context";
import toast from "react-hot-toast"

import { useActionStatusContext } from "../context/actionStatus.context";



let fetchUrl;
if (import.meta.env.VITE_ENV === "development") {
  fetchUrl = "http://localhost:5000/api/auth/logout"
}
else {
  fetchUrl = "/api/auth/logout"
}

export default function useLogout() {
    const { userId: _userId } = useAccessStatusContext();
    const navigate = useNavigate();

    const { setActionStatus } = useActionStatusContext();
    const performLogout = async () => {
        try {
            const data = await fetch(fetchUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _userId })
            });
            const response = await data.json();

            if (response.errorMessage) {
                toast.error(response.errorMessage)
                return Promise.reject("Unable to logout");
            }
            else if (response.successMessage) {
                localStorage.removeItem("accessToken")
                console.log(localStorage.getItem("accessToken"))
                toast.success("Logged out successfully. Redirecting to Login...")

                setActionStatus(true);
                setTimeout(() => {
                    navigate("/login")
                }, 1500);
                return Promise.resolve(response.successMessage)
            }
        } catch (error) {
            console.log(`Error performing the logout operation`, error)
            toast.error(error)
        }
    };

    return performLogout;

}