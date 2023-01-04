import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import Start from "./components/Start/Start";
import Winner from "./components/winner/Winner";
import Addusername from "./pages/Addusername";
import Login from "./pages/Login";
import Register from "./pages/Register";
// imported toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/username" element={<Addusername />} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
     {/* getting the  toast container */}
      <ToastContainer />
    </div>
  );
}

export default App;
