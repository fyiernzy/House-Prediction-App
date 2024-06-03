import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white"
            }
          >
            Prediction Form
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/result"
            className={({ isActive }) =>
              isActive ? "text-white font-bold" : "text-white"
            }
          >
            Result
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
