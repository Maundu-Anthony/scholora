// src/components/Authentication.js
import React, { useState } from 'react';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login form submission
      console.log('Login with', formData.email, formData.password);
    } else {
      // Handle register form submission
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
      } else {
        console.log('Register with', formData.name, formData.email, formData.password);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center">
      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Form Toggle Link */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{isLogin ? 'Login' : 'Register'}</h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              className="text-indigo-600 cursor-pointer hover:text-indigo-800 transition-all"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mt-6 transition-all"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
