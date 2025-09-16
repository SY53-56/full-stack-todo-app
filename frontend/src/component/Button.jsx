import React from "react";
import { NavLink } from "react-router-dom";

export default function Button({ name, classname, onClick, to }) {
  if (to) {
    // Render a NavLink instead of a button
    return (
      <NavLink
        to={to}
      >
        {name}
      </NavLink>
    );
  }

  // Regular button
  return (
    <button className={`${classname} px-4 py-1 rounded transition duration-500 cursor-pointer `}  onClick={onClick}>
      {name}
    </button>
  );
}
