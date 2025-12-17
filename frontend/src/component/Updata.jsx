import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ToggleContext } from "../context/context";

export default function UpdateTodo() {
  const location = useLocation();
  const navigate = useNavigate();
  const todoEdit = location.state; // todo passed from List

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const {toggle} = useContext(ToggleContext)
  // Prefill form when component mounts
  useEffect(() => {
    if (todoEdit) {
      setForm({
        title: todoEdit.title,
        description: todoEdit.description,
      });
    }
  }, [todoEdit]);

  // Handle changes for each input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated data
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  
   await axios.put(
      `https://full-stack-todo-app-8.onrender.com/tasks/api/task/${todoEdit._id}`,
      form,
      {
            withCredentials:true// ✅ attach token
      }
    );

     

    navigate("/"); // back to list
  } catch (err) {
    console.error("Error updating todo:", err.response?.data || err);
  }
};


  return (
   <div className={`w-full h-[100vh] flex justify-center items-center ${
  toggle === "dark" ? "bg-gray-900 text-white" : "bg-gray-400 text-black"
}`}>
  <form
    onSubmit={handleSubmit}
    className={`border rounded-lg p-5 w-[500px]  flex flex-col gap-3 shadow-lg mt-5 ${
      toggle === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
    }`}
  >
    <h1 className="text-3xl text-center font-bold">Update Todo</h1>
    <input
      type="text"
      name="title"
      placeholder="Enter title"
      value={form.title}
      onChange={handleChange}
      className="p-2 rounded border outline-none"
      required
    />
    <textarea
      name="description"
      placeholder="Enter description"
      value={form.description}
      onChange={handleChange}
      className="p-2 rounded border outline-none"
      required
    />
    <button
      type="submit"
      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer transition"
    >
      Update
    </button>
  </form>
</div>

  );
}
