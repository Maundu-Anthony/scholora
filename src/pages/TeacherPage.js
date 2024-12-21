import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherPage = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('authToken'));
    if (user && user.role === 'teacher') {
      setUserName(user.name); // Set user name if the role is teacher
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove auth data from localStorage
    navigate('/'); // Redirect to the login/register page
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Top-left Welcome Message */}
      <h1 className="absolute top-4 left-4 text-2xl font-bold text-blue-600">
        Welcome, {userName}
      </h1>

      {/* Top-right Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Logout
      </button>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Add any other content here */}
      </div>
    </div>
  );
};

export default TeacherPage;
