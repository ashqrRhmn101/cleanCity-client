import React, { use } from "react";
import LatestIssues from "./LatestIssues";
import { Link } from "react-router";
import HeroBanner from "../HeroBanner";

const latestIssues = fetch("http://localhost:3000/latest-issues").then((res) =>
  res.json()
);

const Home = () => {
  const issues = use(latestIssues);
  //   console.log(issues);
  return (
    <div className="my-10 text-center">
      <div>
        <HeroBanner/>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Latest Issues
      </h2>
      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
        {issues.map((issue) => (
          <LatestIssues key={issue._id} issue={issue} />
        ))}
      </div>

      {/* Show All Button */}
      <div className="mt-6">
        <Link to="/issues">
          <button className="btn btn-outline border-[#7A2EFF] text-[#7A2EFF] hover:bg-[#7A2EFF] hover:text-white btn-sm">
            Show All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
