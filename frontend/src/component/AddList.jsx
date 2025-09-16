import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToggleContext } from "../context/context";

export default function AddList({ setTodo }) {
  const [form, setForm] = useState({ title: "", description: "" });
  const { toggle } = useContext(ToggleContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/addTask", form);
      setTodo((prev) => [...prev, res.data]);
      setForm({ title: "", description: "" });
      navigate("/"); // move navigation inside success
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex justify-center items-center ${
        toggle === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
          toggle === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Add a New Task
        </h1>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter your title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-300 ${
              toggle === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Enter your task description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className={`w-full p-3 rounded-lg border resize-none focus:ring-2 focus:outline-none transition-all duration-300 ${
              toggle === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
