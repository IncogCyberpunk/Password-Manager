import { Link, NavLink } from "react-router-dom";

import Logout from "../pages/logout/logout";
import githubLogo from "../assets/images/github.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={`bg-slate-800  sticky  top-0 z-50 flex items-center w-full  px-6 sm:px-64 py-4 text-white ${(screen.width < 760 && menuOpen) ? "pb-10" : ""}`}>
        <button
          className="sm:hidden text-2xl flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={!menuOpen ? "block" : "hidden"}
            style={{ width: "25px", height: "25px" }}
          >
            <RxHamburgerMenu />
          </span>
          <span
            className={menuOpen ? "block" : "hidden"}
            style={{ width: "25px", height: "25px" }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="loop"
              delay="1500"
              state="hover-cross-3"
              style={{ width: "25px", height: "25px" }}
              class="invert relative top"
            ></lord-icon>
          </span>
        </button>


        <div className="font-bold text-wrap text-2xl w-full gap-0.5 flex items-center justify-center  sm:text-3xl">
          <span className="text-purple-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500 ">Word</span>
          <span className="text-purple-500"> /&gt;</span>
        </div>

        <ul className={`${menuOpen ? "flex" : "hidden"} absolute sm:static left-0 py-4 text-xl top-16 w-full border-t-2 border-purple-300 sm:w-auto bg-slate-800 sm:items-center sm:gap-10 font-semibold`} >
          <li className=" w-full flex flex-col gap-3 items-center text-xl">

            <NavLink to="/" className="hover:font-extrabold group flex items-center justify-center gap-2 sm:gap-1 border-x-4 px-6 rounded-full" >
              <lord-icon src="https://cdn.lordicon.com/wmwqvixz.json"
                trigger="loop"
                delay="2000"
                style={{ width: "25px", height: "25px" }}
                class="invert group-hover:transition relative bottom-0.5" ></lord-icon>
              <span className="">Home</span>
            </NavLink>

            <NavLink to="/addcredentials" className="hover:font-extrabold border-x-4 flex gap-2  px-6 rounded-full">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger={screen.screenWidth > 640 ? "hover" : "loop"}
                delay="2000"
                style={{ width: "25px", height: "25px" }}
                class="invert "
              ></lord-icon>
              <span>Add Credentials </span>
            </NavLink>

            <NavLink to="/vault" className="hover:font-extrabold border-x-4 px-6 rounded-full flex items-center gap-2">
              <lord-icon
                src="https://cdn.lordicon.com/lvaninzq.json"
                trigger={screen.screenWidth > 640 ? "hover" : "loop"}
                delay="2500"
                style={{ width: "25px", height: "25px" }}
                class="invert "
              ></lord-icon>
              <span>My Vault</span>
            </NavLink>

            <NavLink to="https://github.com/IncogCyberpunk/Password-Manager" className="hover:font-extrabold flex items-center  gap-3 border-x-4 px-6 rounded-full " >
              <img
                src={githubLogo}
                alt="Github Logo"
                className="rounded-full relative bottom-1 w-8 sm:w-12"
              />
              <span>GitHub</span>
            </NavLink>
            {!(window.location.href.includes("login") || window.location.href.includes("signup")) ? (
              <NavLink to="/logout" className="hover:font-extrabold border-x-4 px-6 rounded-full">
                <Logout />
              </NavLink>
            ) : null}
          </li>
        </ul>

      </nav>
    </>
  );
}
