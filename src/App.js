import React from "react";
import Register from "./components/Register";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import { Routes, Route, HashRouter } from "react-router-dom"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
