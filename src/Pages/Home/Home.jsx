import React, { use } from "react";
import { Link } from "react-router";
import HeroBanner from "../HeroBanner";
import LatestIssues from "./LatestIssues";

// Fetch the latest 6 issues from MongoDB
const latestIssues = fetch(
  "https://cleancity-server.vercel.app/latest-issues"
).then((res) => res.json());

const Home = () => {
  const issues = use(latestIssues);

  return (
    <div className="mb-20">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/*Category Section */}
      <section className="max-w-7xl mx-auto text-center mt-20 px-5">
        <h2 className="text-3xl font-bold mb-8">Explore Issue Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Garbage", icon: "🗑️", color: "bg-green-200" },
            {
              title: "Illegal Construction",
              icon: "🚧",
              color: "bg-orange-200",
            },
            {
              title: "Broken Public Property",
              icon: "🏚️",
              color: "bg-red-200",
            },
            { title: "Road Damage", icon: "🛣️", color: "bg-yellow-200" },
          ].map((cat, i) => (
            <div
              key={i}
              className={`${cat.color} rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer`}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold ">{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/*Recent Complaints Section */}
      <section className="max-w-7xl mx-auto text-center mt-20 px-5">
        <h2 className="text-3xl font-bold mb-8">Recent Complaints</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {issues.slice(0, 6).map((issue) => (
            <LatestIssues key={issue._id} issue={issue} />
          ))}
        </div>

        {/* Show All Button */}
        <div className="mt-8">
          <Link to="/issues">
            <button className="btn btn-outline border-[#7A2EFF] text-[#7A2EFF] hover:bg-[#7A2EFF] hover:text-white">
              Show All
            </button>
          </Link>
        </div>
      </section>

      {/*Community Stats Section */}
      <section className="max-w-7xl mx-auto mt-20 text-center px-5">
        <h2 className="text-3xl font-bold mb-8">Community Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              label: "Registered Users",
              value: "1,245+",
              color: "text-green-600",
            },
            { label: "Issues Resolved", value: "340+", color: "text-blue-600" },
            {
              label: "Pending Issues",
              value: "120+",
              color: "text-orange-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className={`text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*Volunteer / CTA Section */}
      <section className="mt-24 bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join Our Community Clean Drive!
        </h2>
        <p className="mb-6 text-lg">
          Be a part of our mission to keep the city clean and sustainable. Your
          contribution matters.
        </p>
        <Link to="/">
          <button className="btn bg-white text-green-700 border-none hover:bg-gray-200">
            Join Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
