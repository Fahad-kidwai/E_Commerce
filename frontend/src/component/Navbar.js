import React from "react";
import { FaUserAlt, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-[#225520]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="white"
              viewBox="0 0 24 24"
              stroke="#ffffff"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/">Portfolio</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          E Commerce
        </Link>
      </div>
      <div className="navbar-end">
        <div className="flex justify-around w-[10rem]">
          <button className="btn btn-ghost btn-circle">
            <FaSearch fill="#ffffff" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <FaShoppingCart fill="#ffffff" />
          </button>
          <Link to="/login">
            <button className="btn btn-ghost btn-circle">
              <FaUserAlt fill="#ffffff" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
