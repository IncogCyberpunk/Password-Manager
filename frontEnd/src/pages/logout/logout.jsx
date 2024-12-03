import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout.js";

export default function Logout() {
  const navigate=useNavigate();
  const performLogout=useLogout();
  
  const handleLogout =  (e) => {
    e.preventDefault();

    console.log(`I am logout`)
     performLogout();
    console.log(`Successfully logged out`);
    navigate("/login");
  };

  return (
    <>
      <div className="flex gap-2 items-center" onClick={handleLogout}>
        <lord-icon
          src="https://cdn.lordicon.com/vhydshht.json"
          trigger="loop"
          delay="3000"
          style={{width:"45px",height:"45px" }} class="invert"
        ></lord-icon>
        <span>Log Out</span>
      </div>
    </>
  );
}
