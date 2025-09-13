import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

export default function Header() {
  return (
    <div className="flex w-full py-2 bg-blue-200 items-center justify-around">
      <div>
        <h1 className="text-5xl font-bold font-serif">TODo</h1>
      </div>
      <nav>
        <ul className="flex gap-6 font-bold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-500 mb-5 transition duration-100 border-b-orange-600 border-b-2" : "text-black"
              }
            >
              List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addlist"
              className={({ isActive }) =>
                isActive ? "text-red-500 underline" : "text-black"
              }
            >
              Add List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex gap-5">
        <Button classname="bg-gray-700 text-white" name="Login" />
        <Button classname="bg-gray-700 text-white" name="Signup" />
      </div>
    </div>
  );
}
