import React, { useContext } from "react";
import { ToggleContext } from "../context/context";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, toggle } = useContext(ToggleContext);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-6 transition-colors duration-500 ${
        toggle === "dark" ? "bg-gray-900 text-white" : "bg-gray-400 text-gray-900"
      }`}
    >
      {/* Welcome message */}
      <h1 className="text-5xl font-bold font-sans text-center mb-8 mt-5">
        Welcome, {user?.username || "Guest"}!
      </h1>

      {/* Main content */}
      <div className="flex flex-col justify-center md:flex-row items-center gap-8 w-full max-w-6xl">
        {/* Text section */}
        <div className="flex-1 text-center md:text-left justify-center ">
          <h2 className="text-3xl font-semibold mb-4">Organize Your Tasks</h2>
          <p className="text-lg mb-6">
            Keep track of your daily tasks and stay productive. Add, update, and manage your to-dos all in one place.
          </p>
          <button
            className="bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
          >
           <Link to="/addlist"> Get Started</Link>
          </button>
           <button
            className="bg-blue-600 ml-7 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
          >
           <Link to="/list"> get check list</Link>
          </button>
        </div>

        {/* Image section */}
        
      </div>

      {/* Optional secondary image */}
      <div className="mt-12 w-full max-w-4xl">
        <img
          className="w-full rounded-xl shadow-md object-cover"
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG8tZG98ZW58MHx8MHx8&ixlib=rb-4.0.3&q=80&w=1200"
          alt="Planning tasks"
        />
      </div>
    </div>
  );
}
