import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PleaseLogin from "./components/PleaseLogin";

function App() {
  const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Navbar isAuth={isAuth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/session-expired" element={<PleaseLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <PleaseLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
