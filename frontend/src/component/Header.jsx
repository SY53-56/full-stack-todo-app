import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { ToggleContext } from "../context/context";
import { FaSun, FaMoon } from "react-icons/fa";
import axios from "axios";

export default function Header() {
  const { handleToggle, toggle, user, setUser } = useContext(ToggleContext);
  const navigate = useNavigate();

  console.log("Header user:", user);

  // Logout function
  const logoutUser = async () => {
    try {
      const res = await axios.get("https://full-stack-todo-app-8.onrender.com/users/logout", { withCredentials: true });
      console.log(res.data.message);

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error);
    }
  };

  return (
    <div className={`flex w-full py-2 bg-blue-200 items-center justify-around ${toggle=== "light"?"text-blue-950": "text-gray-800"}`}>
      {/* Logo */}
      <div>
   <Link to="/">
           <h1 className="text-5xl font-bold font-serif">TODO</h1>
   </Link>
      </div>
   
      {/* Navigation */}
      <nav className="hidden  lg:flex">
        <ul className="flex gap-6 font-bold text-2xl">
          <li>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 mb-5 outline-none transition duration-100 border-b-orange-600 border-b-2"
                  : "text-black"
              }
            >
              List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addlist"
              className={({ isActive }) =>
                isActive ? "text-red-500 underline outline-none" : "text-black"
              }
            >
              Add List
            </NavLink>
          </li>
       
        </ul>
      </nav>

      {/* Right side buttons */}
      <div className="flex gap-5 items-center ml-5 ">
        {user ? (
          <>
            <span className="font-semibold flex ">Hi {user.username}</span>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={logoutUser}
              name="Logout"
            />
          </>
        ) : (
          <>
            <Button
              className="bg-gray-700 text-white px-4 py-2 rounded"
              to="/login"
              name="Login"
            />
            <Button
              className="bg-gray-700 text-white px-4 py-2 rounded"
              to="/signup"
              name="Signup"
            />
          </>
        )}

        {/* Theme Toggle Button */}
        <Button
          onClick={handleToggle}
          className="bg-yellow-400 text-black px-3 py-2 rounded"
          name={toggle === "dark" ? <FaSun /> : <FaMoon />}
        />
      </div>
    </div>
  );
}
