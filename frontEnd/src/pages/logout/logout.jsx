import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout.js";
import { useAccessStatusContext } from "../../context/accessStatus.context.jsx";


export default function Logout() {
  const {accessStatus}=useAccessStatusContext();

  const performLogout = useLogout();

  const handleLogout = (e) => {
    e.preventDefault();
    performLogout();
  };

  const logoutStyles= screen.width < 768 ? {width: "25px", height: "25px"} : { width: "45px", height: "45px" }

  return (
    <>
    <div className="flex gap-2 items-center" onClick={handleLogout}>
        <lord-icon
          src="https://cdn.lordicon.com/vhydshht.json"
          trigger="loop"
          delay="3000"
          style={logoutStyles}
          class={`invert `}
        ></lord-icon>
        <span>Log Out</span>
      </div>
    </>
  );
}
