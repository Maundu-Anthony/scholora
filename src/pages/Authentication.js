import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import wallpaper from "../assets/wallpaper.jpg";

const Authentication = () => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "register" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (mode === "register") {
      try {
        const response = await fetch(`http://localhost:5000/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          console.log("Registering user:", formData);
          navigate("/dashboard");
        } else {
          console.error("Failed to register user:", response.statusText);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      // Login logic
      try {
        const response = await fetch(`http://localhost:5000/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const users = await response.json();
          const user = users.find(u => u.email === formData.email && u.password === formData.password);

          if (user) {
            console.log("Logging in user:", formData);
            navigate("/dashboard");
          } else {
            alert("Invalid email or password");
          }
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error logging in user:", error);
      }
    }
  };

  const toggleMode = () => setMode(mode === "login" ? "register" : "login");

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
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {mode === "login" ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
              />
            </div>
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
                />
              </div>
            )}
            <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600">
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
          <p className="text-center mt-4">
            {mode === "login" ? "Don’t have an account?" : "Already have an account?"}
            <button onClick={toggleMode} className="text-indigo-500 hover:text-indigo-600 ml-2">
              {mode === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Authentication;