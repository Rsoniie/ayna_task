import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Home from "./pages/HomePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App