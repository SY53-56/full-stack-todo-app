import React, { useContext } from 'react'
import { ToggleContext } from '../context/context'
import Button from './Button'

export default function Login() {
    const {toggle}= useContext(ToggleContext)
  return (
    <div  className={`w-full min-h-screen flex justify-center items-center ${
        toggle === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
        <form action="" className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
          toggle === "dark" ? "bg-gray-800" : "bg-white"
        }`}>
           <h1 className="text-3xl font-extrabold mb-6 text-center">
         login
        </h1>
            <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
          
          
            className={`w-full p-3 mb-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${
              toggle === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
            <label className="block text-sm font-medium mb-2">Pasword</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          
          
            className={`w-full p-3  mb-4 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${
              toggle === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          <Button classname="bg-green-400 px-4 py-1 rounded w-full " name="login"/>
        </form>
    </div>
  )
}
