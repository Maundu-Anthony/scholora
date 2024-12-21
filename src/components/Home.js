// src/components/Home.js
import React from 'react';
import wallpaper from '../assets/wallpaper.jpg'; // Import the image

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${wallpaper})` }} // Apply the background image
    >
      <div className="text-center px-6 py-12 bg-black bg-opacity-0">
        <h1 className="text-4xl font-extrabold sm:text-5xl text-gray-900">
          Welcome to Scholora
        </h1>
        <p className="mt-4 text-lg text-black">
          A modern platform to manage teachers, students, and school resources efficiently.
        </p>
      </div>
    </div>
  );
};

export default Home;
