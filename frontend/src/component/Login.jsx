import React, { useContext, useState } from 'react'
import { ToggleContext } from '../context/context'
import Button from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const {toggle,setUser,setIsAuth}= useContext(ToggleContext)
   const [form, setForm] = useState({
    email:'',
    password:''
   })
   const navigate = useNavigate()
  function handleChange(e){
    setForm({...form,[e.target.name]: e.target.value})
  }

 const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Send login request, include cookies
     const res=  await axios.post(
        "http://localhost:3000/users/login",
        form,
        { withCredentials: true } // ✅ important to send cookies
      )
      
   setUser(res.data.user); // res.data.user must exist
setIsAuth(true);
 // On success, redirect to homepage
      navigate("/")
    } catch (err) {
      console.error("Login error:", err.response?.data || err)
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div  className={`w-full min-h-screen flex justify-center items-center ${
        toggle === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
        <form action="" onSubmit={handleSubmit} className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
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
            value={form.email}
           onChange={handleChange}
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
            value={form.password}
           onChange={handleChange}
            className={`w-full p-3  mb-4 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${
              toggle === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          <Button classname="bg-green-400 px-4 py-1 rounded w-full " type="submit" name="login"/>
         
        </form>
    </div>
  )
}
