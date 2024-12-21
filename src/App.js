// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router, Route, Routes for routing
import Navbar from "./components/Navbar"; // Import Navbar component
import Authentication from "./components/Authentication"; // Import the Authentication component
import Home from "./components/Home"; // Import the Home component

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<Authentication onAuth={(userData) => console.log(userData)} />} />
          <Route path="/register" element={<Authentication onAuth={(userData) => console.log(userData)} />} />
          <Route path="/dashboard" element={<h1 className="text-center p-8">Dashboard</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
