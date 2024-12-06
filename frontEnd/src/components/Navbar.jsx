import { Link, NavLink } from "react-router-dom";

import Logout from "../pages/logout/logout";
import githubLogo from "../assets/images/github.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-slate-800  sticky  top-0 z-50 flex items-center w-full  px-5 sm:px-64 py-4 text-white">
        <button
          className="sm:hidden text-2xl "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <RxHamburgerMenu />
        </button>

        <div className="font-bold text-wrap text-2xl w-full gap-0.5 flex items-center justify-center  sm:text-3xl">
          <span className="text-purple-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500 ">Word</span>
          <span className="text-purple-500"> /&gt;</span>
        </div>

        <ul
          className={`${menuOpen? "flex": "hidden"} absolute sm:static left-0 py-4 text-xl top-14 w-full border-t-2 border-purple-300 sm:w-auto bg-slate-800 sm:items-center sm:gap-10 font-semibold`}
        >
          <li className=" w-full flex flex-col gap-3 items-center">
            <NavLink
              to="/"
              className="hover:font-extrabold group flex justify-center gap-3 sm:gap-1 "
            >
              <lord-icon
                src="https://cdn.lordicon.com/wmwqvixz.json"
                trigger="loop"
                delay="3000"
                style={{ width: "35px", height: "35px" }}
                class="invert group-hover:transition relative bottom-0.5"
              ></lord-icon>
              <span className="text-2xl">Home</span>
            </NavLink>
            <NavLink to="/addcredentials" className="hover:font-extrabold ">
              Add Credentials
            </NavLink>
            <NavLink to="/vault" className="hover:font-extrabold">
              My Vault
            </NavLink>
            <a
              href="https://github.com/IncogCyberpunk/Password-Manager"
              className="hover:font-extrabold flex  gap-3 "
            >
              <img
                src={githubLogo}
                alt="Github Logo"
                className="rounded-full relative bottom-1 w-8 sm:w-12"
              />
              <span>GitHub</span>
            </a>
            {!(
              window.location.href.includes("login") ||
              window.location.href.includes("signup")
            ) ? (
              <NavLink to="/logout" className="hover:font-extrabold">
                {" "}
                <Logout />{" "}
              </NavLink>
            ) : null}
          </li>
        </ul>
      </nav>
    </>
  );
}
