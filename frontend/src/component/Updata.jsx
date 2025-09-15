import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateTodo({ setTodo }) {
  const location = useLocation();
  const navigate = useNavigate();
  const todoEdit = location.state; // todo passed from List

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

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
        console.log("Sending to backend:", form);
      const res = await axios.put(
        `http://localhost:3000/api/task/${todoEdit._id}`,
        form
      );

      setTodo((prev) =>
        prev.map((t) => (t._id === res.data._id ? res.data : t))
      );

      navigate("/"); // back to list
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center mt-10 gap-4">
      <h1 className="text-3xl font-bold">Update Todo</h1>

      <form
        onSubmit={handleSubmit}
        className="border rounded p-5 w-[500px] flex flex-col gap-3 shadow-lg mt-5 bg-gray-100"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="p-2 rounded border outline-none"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="p-2 rounded border outline-none"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
