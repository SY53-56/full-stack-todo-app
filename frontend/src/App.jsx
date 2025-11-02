import React, { useContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";   // ✅ added

import Update from "./component/Updata";
import Login from "./component/Login";
import Signup from "./component/Singup";
import Home from "./component/Home";
import PrivateRoute from "./component/PrivateRouts";
import ToggleContextProvider from "./context/ToggleContextProvider";
import { ToggleContext } from "./context/context";

const AddList = lazy(() => import("./component/AddList"));
const List = lazy(() => import("./component/List"));

function App() {
  return (
    <ToggleContextProvider>
      <AppContent />
    </ToggleContextProvider>
  );
}

function AppContent() {
  const { toggle } = useContext(ToggleContext);

  return (
    <div
      className={`${
        toggle === "dark" ? "bg-white text-black" : "bg-black text-white"
      } min-h-screen transition duration-500`}
    >
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/list"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading List...</div>}>
                <List />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/addlist"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <AddList />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/update"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer /> {/* ✅ Now footer will show */}
    </div>
  );
}

export default App;
