import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const NavBar = () => {
  const { user, logOutUser } = use(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/issues">Issues</NavLink>
      </li>
      {/* All Issues, Add Issues, My Issues, My Contribution, */}
      {
        user && <>
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
      }
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          Clean City
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {/* Button */}
      <div className="navbar-end pr-3">
        {user ? (
          <button onClick={handleLogOut} className="btn">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login">
              <button className="btn">Login</button>
            </NavLink>
            <NavLink to="/register">
              <button className="btn">Register</button>
            </NavLink>
          </>
        )}
      </div>
      {/* PhotoURL */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar group relative"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={
                user
                  ? user.photoURL
                  : "https://img.icons8.com/?size=100&id=oO0pZgktLNpK&format=png&color=000000"
              }
            />
          </div>
          {/* User Name */}
          {user && (
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {user.displayName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
