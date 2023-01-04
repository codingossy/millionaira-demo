import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import Start from "./components/Start/Start";
import Winner from "./components/winner/Winner";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
    </div>
  );
}

export default App;
