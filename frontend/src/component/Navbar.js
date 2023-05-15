import { React, useState } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user/UserContext";
import { logout } from "../context/user/UserActions";
import { toast } from "react-toastify";

const Navbar = ({ onSearchQueryChange }) => {
  const { dispatch, state } = useContext(UserContext);
  console.log(state);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    onSearchQueryChange(searchInput);
  };

  // const handleSearchButtonClick = () => {
  //   onSearchQueryChange(searchInput);
  // };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("cartItems");
    dispatch({ type: "LOGOUT_USER" });
    navigate("/");
    toast.success("Logged out Successfully");
  };

  return (
    <div className="navbar bg-[#225520] fixed z-[1000]">
      <div className="navbar-start">
        <div className="mask mask-circle w-10 h-10">
          <img
            src="https://res.cloudinary.com/dydwvfozy/image/upload/v1684093436/logo1_z6jtys.png"
            alt=""
          />
        </div>
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
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-2xl text-white">
          {/* FreshHarvest */}
          FreshHarvest
        </Link>
      </div>
      <div className="navbar-end">
        <div className="flex items-center justify-around w-[25rem]">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Share what you want"
            className="input input-bordered w-full max-w-xs h-8 mr-4"
          />
          <Link to="/cart/" className="btn btn-ghost">
            <FaShoppingCart fill="#ffffff" />
          </Link>
          {/* dropdown for authenticaation of user */}
          <div className="dropdown dropdown-end text-black">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <FaUserAlt fill="#ffffff" />
            </label>
            <ul
              tabIndex={0}
              className=" p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {state.user && (
                <>
                  <li>
                    <Link className="justify-between" to="/profile">
                      {state.user.name}
                    </Link>
                  </li>
                  <li>
                    <Link className="justify-between" to="/orders">
                      My Orders
                    </Link>
                  </li>
                  {state.user.role === "admin" && (
                    <>
                      <hr />
                      <li>
                        <Link className="justify-between" to="/admin/">
                          Admin Dashboard
                        </Link>
                      </li>
                    </>
                  )}
                  <hr />
                  <li onClick={handleLogout}>
                    <Link>Logout {state.user && state.user.email}</Link>
                  </li>
                </>
              )}
              {!state.user && (
                <>
                  <li>
                    <Link className="justify-between" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="justify-between" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
