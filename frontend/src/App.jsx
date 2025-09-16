import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import List from "./component/List";
import AddList from "./component/AddList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Updata from "./component/Updata";
import ToggleContextProvider from "./context/ToggleContextProvider";
import { useContext } from "react";
import { ToggleContext } from "./context/context";
import Login from "./component/Login";
import Signup from "./component/Singup";

function App() {
  let [todo, setTodo] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api");
        setTodo(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <ToggleContextProvider >
      <AppContent todo={todo} setTodo={setTodo} />
    </ToggleContextProvider>
  );
}

function AppContent({ todo, setTodo }) {
  const { toggle } = useContext(ToggleContext);

  return (
    <div className={`${toggle === "dark" ? "bg-white text-black " : "bg-black text-white"} h-[100vh]  transition duration-500`}>
      <Header />
      <Routes>
        <Route path="/" element={<List todo={todo} setTodo={setTodo} />} />
        <Route path="/addlist" element={<AddList setTodo={setTodo} />} />
        <Route path="/updata" element={<Updata todo={todo} setTodo={setTodo} />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/Singup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;


