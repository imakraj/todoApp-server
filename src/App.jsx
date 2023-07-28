import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Navbar from "./Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "./index";
import axios from "axios";
import { useEffect, useContext } from "react";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}

export default App;
