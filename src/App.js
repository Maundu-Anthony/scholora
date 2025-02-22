import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword"; // Import ResetPassword
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/reset-password" element={<ResetPassword />} /> // Add ResetPassword route
        </Routes>
      </Router>
    </div>
  );
};

export default App;