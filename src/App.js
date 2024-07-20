import React from "react";
import Register from "./components/Register";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
