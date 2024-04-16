import { useState } from "react";
import logo from "./Holidaze-logo-ver.png";
import { CartIcon } from "../CartIcon";
import { Link, NavLink } from "react-router-dom";
import "./index.css";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="text-black sticky top-0 z-10 bg-white">
      <div className="flex justify-between">
        <Link to="/" className="self-center">
          <img src={logo} alt="Holidaze Logo" className="size-24" />
        </Link>
        <div className="flex">
          <nav>
            <ul className="p-4 flex" id="navbar">
              <li className="p-4 text-xl">
                <NavLink to="/">HOME</NavLink>
              </li>
              <li className="p-4 text-xl">
                <NavLink to="/contact">SIGN IN</NavLink>
              </li>
            </ul>
          </nav>
          {/* <div className="md:hidden self-center">
            <button
              onClick={toggleMenu}
              className="text-darkGreen focus:outline-none"
            >
              <svg
                className="size-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>

      {/* {isOpen && (
        <nav className="justify-self-end">
          <ul className="md:hidden bg-white border rounded border-darkGreen p-4 w-fit" id="navbar">
            <li className="p-4 text-xl">
              <NavLink to="/">HOME</NavLink>
            </li>
            <li className="p-4 text-xl">
              <NavLink to="/contact">CONTACT</NavLink>
            </li>
          </ul>
        </nav>
      )} */}
    </header>
  );
}
