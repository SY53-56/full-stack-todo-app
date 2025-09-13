import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import List from "./component/List";
import AddList from "./component/AddList";


function App() {
  return (
    <>
      <Header />
      <Routes>
       <Route path="/" element={<List/>}/>
        <Route path="/addlist" element={<AddList/>}/>
      </Routes>
    </>
  );
}

export default App;
