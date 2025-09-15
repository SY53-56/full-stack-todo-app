import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddList({ setTodo }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
 
  });

  const navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/addTask", form);
      setTodo(prev => [...prev, res.data]);
      setForm({ title: "", description: "", });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='border rounded p-5  w-[500px] h-auto shadow-2xl flex flex-col gap-3'>
        <h1 className='text-black text-3xl mb-3 text-center font-bold'>Add Todo</h1>

        <label className='text-black font-bold '>Title</label>
        <input
          type="text"
          name="title"
         placeholder='Enter your title'
          value={form.title}
          onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
          className='p-2 rounded border outline-none'
          required
        />

        <label className='text-black font-bold'>Description</label>
       <textarea  
          name="description"
          rows={4}
          cols={4}
          value={form.description}
          onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
          className='p-2 rounded border outline-none'
          required
          placeholder='Enter your task '
          ></textarea>
      

        <button type="submit" onClick={()=> navigate("/")} className='bg-blue-500 cursor-pointer text-white transition-all duration-500 p-2 rounded hover:bg-blue-600'>
          Submit
        </button>
      </form>
    </div>
  );
}
