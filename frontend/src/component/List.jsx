import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
export default function List({ todo,setTodo }) {


  const navigate = useNavigate()
 const handleDelete= async(id)=>{
try{
    await axios.delete(`http://localhost:3000/api/task/${id}`)
    setTodo((prev)=> prev.filter(todo =>todo._id !== id))
}catch(e){
  console.log(e)
}

 }
  return (
    <div className='w-full flex justify-center mt-10'>
      <div className='w-[600px]'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>My Todos</h1>

        {todo.length === 0 ? (
          <p className='text-center text-gray-500'>No todos yet. Add some!</p>
        ) : (
          <ul className='flex flex-col gap-4'>
            {todo.map(item => (
              <li
                key={item._id}
                className='bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300'
              >
                <div className='flex flex-col'>
                  <h2 className='text-2xl font-semibold text-gray-900 mb-2'>{item.title}</h2>
                  <p className='text-gray-700 mb-2'>{item.description}</p>
                  <div className='flex gap-10'>
                    <button onClick={()=>handleDelete(item._id)}  className='px-4 bg-red-500 transition py-1 text-white cursor-pointer hover:bg-red-600 rounded'>Delete</button>
                     <button  className='px-4 bg-blue-500 transition py-1 text-white cursor-pointer hover:bg-blue-600 rounded' onClick={()=>navigate("/updata",{state:item})}>Edit Task</button>
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
