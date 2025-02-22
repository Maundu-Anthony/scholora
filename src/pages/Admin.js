import React, { useState } from "react";
import Navbar from "../components/Navbar";
import wallpaper from "../assets/wallpaper.jpg";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const admins = await response.json();
        const admin = admins.find(a => a.username === username && a.password === password);

        if (admin) {
          setIsLoggedIn(true);
          setError(""); // Clear errors on successful login
        } else {
          setError("Invalid username or password");
        }
      } else {
        console.error("Failed to fetch admin data:", response.statusText);
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in admin:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!isLoggedIn ? (
          // Admin Login Form
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          // Admin Dashboard (After Successful Login)
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Administrator Dashboard</h1>
            <p className="text-gray-700">Welcome, Admin! Manage users and settings here.</p>
            <div className="mt-6">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                Manage Users
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;