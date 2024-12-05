import { Link, NavLink } from "react-router-dom";

import Logout from "../pages/logout/logout";
import githubLogo from "../assets/images/github.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";


export default function Navbar() {

  return (
    <>
      <nav className="bg-slate-800 h-10 sm:h-auto  sticky top-0 z-50 sm:flex items-center justify-between px-64 py-5 text-white">
        <div className=" font-bold text-3xl">
          <span className="text-purple-500">&lt; </span>
          <span>Pass</span>
          <span className="text-green-500">Word</span>
          <span className="text-purple-500"> /&gt;</span>
        </div>
        <ul>
          <li className="flex gap-10 font-semibold text-2xl  items-center">
            <NavLink to="/" className="hover:font-extrabold group flex items-center gap-1 ">
              <lord-icon
                src="https://cdn.lordicon.com/wmwqvixz.json"
                trigger="loop"
                delay="3000"
                style={{ width: "35px", height: "35px" }}
                class="invert group-hover:transition relative bottom-0.5"
              ></lord-icon>
              <span>Home</span>
            </NavLink>
            <NavLink to="/addcredentials" className="hover:font-extrabold">
              Add Credentials
            </NavLink>
            <NavLink to="/vault" className="hover:font-extrabold">
              My Vault
            </NavLink>
            <a
              href="https://github.com/IncogCyberpunk/Password-Manager"
              className="hover:font-extrabold flex items-center gap-3 "
            >
              <img
                src={githubLogo}
                width="48px"
                alt="Github Logo"
                className="rounded-full relative bottom-1"
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
