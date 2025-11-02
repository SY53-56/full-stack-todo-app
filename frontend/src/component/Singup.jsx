import React, { useContext, useState } from 'react';
import { ToggleContext } from '../context/context';
import Button from './Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const { toggle,setUser ,setIsAuth} = useContext(ToggleContext); // ✅ Correct destructuring
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/users/signup",
        form,
        { withCredentials: true } // ✅ important for cookie
      );

      console.log("Signup success:", res.data);
      console.log(res.data);
setUser(res.data.user); // res.data.user must exist
setIsAuth(true); // store user info
 // ✅ use form.username since backend doesn't return it

      navigate("/"); // redirect to home or dashboard
      setForm({ username: "", email: "", password: "" }); // reset form
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className={`w-full min-h-screen flex justify-center items-center ${toggle === "dark" ? "bg-gray-900 text-white" : "bg-gray-400 text-gray-900"}`}>
      <form
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors duration-300 ${toggle === "dark" ? "bg-gray-800" : "bg-white"}`}
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">Signup</h1>

        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className={`w-full p-3 mb-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${toggle === "dark" ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-gray-50 border-gray-300 focus:ring-blue-500"}`}
          required
        />

        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`w-full p-3 mb-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${toggle === "dark" ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-gray-50 border-gray-300 focus:ring-blue-500"}`}
          required
        />

        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className={`w-full p-3 mb-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${toggle === "dark" ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-gray-50 border-gray-300 focus:ring-blue-500"}`}
          required
        />

        <Button classname="bg-amber-400 px-4 py-2 rounded w-full" name="Sign up" />
        <div>
          <p className='text-center'>if you have already account <Link to="/login" className='text-emerald-600'>Login</Link></p>
        </div>
      </form>
    </div>
  );
}
