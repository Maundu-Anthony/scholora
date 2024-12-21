import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('teacher');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      try {
        const response = await axios.get('http://localhost:5000/users');
        const user = response.data.find(
          (user) =>
            user.email === formData.email &&
            user.password === formData.password &&
            user.role === selectedRole
        );

        if (user) {
          localStorage.setItem('authToken', JSON.stringify(user));
          // Navigate to the specific role's page
          switch (user.role) {
            case 'teacher':
              navigate('/teacher');
              break;
            case 'admin':
              navigate('/admin');
              break;
            case 'learner':
              navigate('/learner');
              break;
            default:
              setError('Invalid role');
          }
        } else {
          setError('Invalid email, password, or role');
        }
      } catch (err) {
        setError('An error occurred during login');
      }
    } else {
      // Handle registration
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }

      try {
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedRole,
        };

        await axios.post('http://localhost:5000/users', newUser);
        setIsLogin(true); // Switch to login
      } catch (err) {
        setError('Failed to register');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
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

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-600">Select Role</label>
          <select
            name="role"
            id="role"
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
            <option value="learner">Learner</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
