import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = () => {
  const { user, logOutUser } = use(AuthContext);

  const handleLogOut = () => {
    logOutUser()
      .then(() => toast.success("Logout Successful!"))
      .catch((error) => console.log(error));
  };

  // Theme setup
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () =>
    setTheme(theme === "light" ? "dark" : "light");

  // Navigation Links
  const links = (
    <>
      <li>
        <NavLink to="/" className="font-medium">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/issues" className="font-medium">
          All Issues
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/addIssues">Add Issues</NavLink>
          </li>
          <li>
            <NavLink to="/myIssues">My Issues</NavLink>
          </li>
          <li>
            <NavLink to="/myContribution">My Contribution</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 backdrop-blur-md">
      {/* Left - Logo */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}

            {/* Dark/Light Toggle for Mobile */}
            <li className="mt-3">
              <button
                onClick={handleThemeToggle}
                className="flex items-center justify-center gap-2 text-sm font-medium"
              >
                {theme === "light" ? (
                  <>
                    <FaMoon className="text-lg text-gray-500" /> Dark Mode
                  </>
                ) : (
                  <>
                    <FaSun className="text-lg text-yellow-400" /> Light Mode
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Brand Name */}
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          🧹<span className="text-green-500">Clean</span>City
        </Link>
      </div>

      {/* Center - Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{links}</ul>
      </div>

      {/* Right - Theme + Auth + Profile */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle (Desktop) */}
        <button
          onClick={handleThemeToggle}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-base-200 transition"
        >
          {theme === "light" ? (
            <FaMoon className="text-lg text-gray-600" />
          ) : (
            <FaSun className="text-lg text-yellow-400" />
          )}
        </button>

        {/* Auth Buttons */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-11 rounded-full border-2 border-green-500">
                <img
                  alt="User Avatar"
                  src={
                    user.photoURL ||
                    "https://img.icons8.com/?size=100&id=oO0pZgktLNpK&format=png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-success text-white">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login">
              <button className="btn btn-sm btn-outline btn-success">
                Login
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="btn btn-sm btn-success text-white">
                Register
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
