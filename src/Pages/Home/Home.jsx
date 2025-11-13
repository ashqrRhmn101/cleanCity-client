import React, { use } from "react";
import { Link } from "react-router";
import HeroBanner from "../HeroBanner";
import LatestIssues from "./LatestIssues";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import { Globe2, Users, Sparkles, Globe2Icon } from "lucide-react";

// Animations
import roadAnimation from "../../assets/Road.json";
import brokenAnimation from "../../assets/broken2.json";
import illegalAnimation from "../../assets/illegal.json";
import garbageAnimation from "../../assets/garbage.json";

// Fetch latest 6 issues from MongoDB
const latestIssues = fetch(
  "https://cleancity-server.vercel.app/latest-issues"
).then((res) => res.json());

const Home = () => {
  const issues = use(latestIssues);

  // Category data properly structured
  const categories = [
    {
      title: "Garbage",
      animation: garbageAnimation,
      color: "bg-green-100",
    },
    {
      title: "Illegal Construction",
      animation: illegalAnimation,
      color: "bg-orange-100",
    },
    {
      title: "Broken Public Property",
      animation: brokenAnimation,
      color: "bg-red-100",
    },
    {
      title: "Road Damage",
      animation: roadAnimation,
      color: "bg-yellow-100",
    },
  ];

  return (
    <div className="">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Section */}
      <section className="max-w-7xl mx-auto text-center mt-20 px-5">
        <h2 className="text-3xl font-bold mb-8">Explore Issue Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`${cat.color} rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center`}
            >
              <div className="w-28 h-28 mb-3">
                <Lottie animationData={cat.animation} loop={true} />
              </div>
              <h3 className="font-semibold">{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Complaints Section */}
      <section className="max-w-7xl mx-auto text-center mt-20 px-5">
        <h2 className="text-3xl font-bold mb-8">Recent Complaints</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {issues.slice(0, 6).map((issue) => (
            <LatestIssues key={issue._id} issue={issue} />
          ))}
        </div>

        <div className="mt-8">
          <Link to="/issues">
            <button className="btn btn-outline border-[#7A2EFF] text-[#7A2EFF] hover:bg-[#7A2EFF] hover:text-white">
              Show All
            </button>
          </Link>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="max-w-7xl mx-auto mt-24 text-center px-5">
        {/* Animated Title */}
        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-600">
          <Typewriter
            words={[
              "Community Impact",
              "Our Progress Together",
              "Clean City in Action 🧹",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              label: "Registered Users",
              value: "1,245+",
              color: "from-green-400 to-emerald-600",
            },
            {
              label: "Issues Resolved",
              value: "340+",
              color: "from-blue-400 to-indigo-600",
            },
            {
              label: "Pending Issues",
              value: "120+",
              color: "from-amber-400 to-orange-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-10 blur-2xl`}
              ></div>

              <h3
                className={`text-5xl font-extrabold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text relative z-10`}
              >
                {stat.value}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-3 relative z-10 font-medium text-lg tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer / CTA Section */}
      <section className="relative mt-24 overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-cyan-600 text-white py-20 text-center">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]"></div>

        {/* Animated Glow Circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-blue-400/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
            🌍 Join Our{" "}
            <span className="text-yellow-300">Community Clean Drive!</span>
          </h2>

          <p className="mb-8 text-lg md:text-xl text-gray-100">
            Let’s make our city{" "}
            <span className="font-semibold text-white">cleaner, greener</span>
            and more sustainable — together. 🌿 Every small action counts!
          </p>

          <Link to="/register">
            <button className="btn bg-primary text-white font-semibold border-none hover:bg-green-500 hover:scale-105 transition-transform duration-300">
              🚀 Join Now
            </button>
          </Link>
        </div>

        {/* Optional Bottom Wave Shape */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,192C384,181,480,171,576,170.7C672,171,768,181,864,176C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224V320H0Z"
          ></path>
        </svg>
      </section>
    </div>
  );
};

export default Home;
