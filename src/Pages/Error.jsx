import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import errorAnimation from "../assets/404.json"; 

const Error = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center">
      {/*Gradient Background with floating effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-green-400 animate-gradientMove opacity-90"></div>

      {/* Floating glowing circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Animated 404 Lottie */}
      <div className="relative z-10 w-64 md:w-80">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      {/* Animated Title */}
      <h1 className="relative z-10 text-[100px] md:text-[100px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-green-200 to-purple-300 drop-shadow-xl animate-float">
        404
      </h1>

      {/* Typewriter Subtitle */}
      <h2 className="text-2xl md:text-3xl font-semibold text-white relative z-10 mt-2">
        <Typewriter
          words={[
            "Oops! Page Not Found 😢",
            "Looks like you're lost in CleanCity 🧭",
            "Let's get you back Home 🏡",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>

      <p className="mt-3 text-gray-100 relative z-10 max-w-md">
        The page you’re looking for doesn’t exist, has been moved, or might have been cleaned away!
      </p>

      {/* Home Button */}
      <Link to="/" className="relative z-10 mt-6">
        <button className="btn bg-white text-purple-600 hover:bg-purple-600 hover:text-white px-8 shadow-lg border-none transition-all duration-300">
          ⬅ Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
