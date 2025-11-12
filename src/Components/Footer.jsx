import React from "react";
import { Link } from "react-router";
import { FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-700 pb-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              <span>🧹Clean</span>
              <span className="text-green-500"> City </span>  Portal
            </h2>
            <p className="text-sm text-gray-400 max-w-sm">
              Together we can make our communities cleaner, greener, and safer.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-6 text-sm font-medium">
            <Link
              to="/"
              className="hover:text-green-400 transition-colors"
            >
              About
            </Link>
            <Link
              to="/"
              className="hover:text-green-400 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/"
              className="hover:text-green-400 transition-colors"
            >
              Volunteer
            </Link>
            <Link
              to="/"
              className="hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-5">
          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} CleanCity Portal. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 text-xl">
            {/* X (Twitter) */}
            <a
              href="https://x.com/ashqrrmn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaXTwitter className="w-5 h-5 hover:scale-110 transition-transform" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/_ashqrrmn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <FaInstagram className="w-5 h-5 hover:scale-110 transition-transform" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ashqrrhmn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin className="w-5 h-5 hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
