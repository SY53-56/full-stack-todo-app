import React, { useContext, useState } from 'react'
import { ToggleContext } from '../context/context'
import Button from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const { toggle } = useContext(ToggleContext)
  const {setUser}= useContext(ToggleContext)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })
const navigate = useNavigate()
  // Update form state on input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  // ✅ fixed capitalization

    try {
      const res = await axios.post("http://localhost:3000/singup", form) // ✅ match backend
      console.log("Signup success:", res.data)
         const { token } = res.data;

    // Token ko localStorage + context me save karo
    localStorage.setItem("token", token);
    setUser({ username: form.username, token });
     navigate("/")

      setForm({ username: "", email: "", password: "" }) // reset form
    } catch (error) {
      console.error("Signup error:", error.response?.data || error)
      alert(error.response?.data?.error || "Signup failed")
    }
  }

  return (
    <div
      className={`w-full min-h-screen flex justify-center items-center ${
        toggle === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`} 
    >
      <form
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
          toggle === "dark" ? "bg-gray-800" : "bg-white"
        }`}
        onSubmit={handleSubmit} // ✅ submit handler
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Signup
        </h1>

        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange} // ✅ update state
          placeholder="Enter your username"
          className={`w-full p-3 mb-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${
            toggle === "dark"
              ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
              : "bg-gray-50 border-gray-300 focus:ring-blue-500"
          }`}
          required
        />

        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`w-full p-3 mb-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${
            toggle === "dark"
              ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
              : "bg-gray-50 border-gray-300 focus:ring-blue-500"
          }`}
          required
        />

        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className={`w-full p-3 mb-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${
            toggle === "dark"
              ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
              : "bg-gray-50 border-gray-300 focus:ring-blue-500"
          }`}
          required
        />

        <Button  className="bg-amber-400 px-4 py-2 rounded w-full" name="Sign up" />
      </form>
    </div>
  )
}
