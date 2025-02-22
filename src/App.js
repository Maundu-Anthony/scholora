import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Admin from "./pages/Admin"; // ✅ Corrected Admin Import
import wallpaper from "./assets/wallpaper.jpg"; 

const App = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/admin" element={<Admin />} /> {/* ✅ Added Admin Route */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;