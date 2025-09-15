import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import List from "./component/List";
import AddList from "./component/AddList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Updata from "./component/Updata";


function App() {
  let [todo, setTodo] = useState([])
  useEffect(()=>{
    const  fetchData=async ()=>{
  try{
    const res =await axios.get("http://localhost:3000/api")
      setTodo(res.data)
  }catch(e){
    console.log(e)
  }
    }
    fetchData()
  },[])
  return (
    <>
      <Header />
      <Routes>
       <Route path="/" element={<List todo={todo} setTodo={setTodo}/>} />
        <Route path="/addlist" element={<AddList setTodo={setTodo}/>}/>
        <Route path="/updata" element={<Updata todo={todo} setTodo={setTodo}/>}/>
      </Routes>
    </>
  );
}

export default App;
