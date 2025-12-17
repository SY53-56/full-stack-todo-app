import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleContext } from "../context/context";

export default function List() {
  const [todo, setTodo] = useState([]); // local state
  const navigate = useNavigate();
  const { toggle } = useContext(ToggleContext);

 useEffect(() => {
  const fetchTodos = async () => {
    try {
      const res = await axios.get("https://full-stack-todo-app-8.onrender.com/tasks/api", { withCredentials: true });
      setTodo(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  fetchTodos();
}, []);


  // Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://full-stack-todo-app-8.onrender.com/tasks/api/task/${id}`, {withCredentials:true});
      setTodo((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex justify-center py-12 px-4 transition-colors duration-300 ${
        toggle === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-400 text-gray-900"
      }`}
    >
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center">My Todos</h1>

        {todo.length === 0 ? (
          <p className="text-center text-gray-400">No todos yet. Add some!</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {todo.map((item) => (
              <li
                key={item._id}
                className={`rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 ${
                  toggle === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold mb-2 break-words">
                    {item.title}
                  </h2>
                  <p className="mb-4 opacity-90 break-words">
                    {item.description}
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={()=> handleDelete(item._id)}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 active:scale-95 transition-all duration-200"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate("/update", { state: item })}
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 active:scale-95 transition-all duration-200"
                    >
                      Edit Task
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
