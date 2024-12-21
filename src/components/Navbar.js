// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="hover:text-gray-300">
            Scholora
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="text-lg hover:text-gray-300 transition-all">Home</Link>
          <Link to="/login" className="text-lg hover:text-gray-300 transition-all">Login/Register</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          {/* Add hamburger icon for mobile */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
