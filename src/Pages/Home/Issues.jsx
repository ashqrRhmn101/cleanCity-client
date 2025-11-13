import React, { useState } from "react";
import { useLoaderData, Link } from "react-router";
import { ArrowRight, ChevronDown, MapPin, Tag } from "lucide-react";

const Issues = () => {
  const allIssues = useLoaderData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Combined Filtering Logic
  const filteredIssues = allIssues.filter((issue) => {
    const statusMatch =
      statusFilter === "all" ||
      issue.status?.toLowerCase() === statusFilter.toLowerCase();

    const categoryMatch =
      categoryFilter === "all" ||
      issue.category?.toLowerCase() === categoryFilter.toLowerCase();

    return statusMatch && categoryMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-extrabold">
          🧾 All Reported <span className="text-amber-300">Issues</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center justify-between gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:bg-base-300 transition"
            >
              <span>
                {categoryFilter === "all"
                  ? "All Categories"
                  : categoryFilter.charAt(0).toUpperCase() +
                    categoryFilter.slice(1)}
              </span>
              <ChevronDown size={18} />
            </div>

            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg"
            >
              {[
                "all",
                "garbage",
                "illegal construction",
                "broken public property",
                "road damage",
              ].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategoryFilter(cat)}
                    className={`capitalize ${
                      categoryFilter === cat
                        ? "active text-green-600 font-semibold"
                        : ""
                    }`}
                  >
                    {cat === "all"
                      ? "All Categories"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Filter */}
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center justify-between gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:bg-base-300 transition"
            >
              <span>
                {statusFilter === "all"
                  ? "All Status"
                  : statusFilter === "ongoing"
                  ? "Ongoing"
                  : "Ended"}
              </span>
              <ChevronDown size={18} />
            </div>

            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow-lg"
            >
              {["all", "ongoing", "ended"].map((status) => (
                <li key={status}>
                  <button
                    onClick={() => setStatusFilter(status)}
                    className={`capitalize ${
                      statusFilter === status
                        ? "active text-green-600 font-semibold"
                        : ""
                    }`}
                  >
                    {status === "all"
                      ? "All Status"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => {
            const {
              _id,
              title,
              description,
              category,
              location,
              image,
              amount,
              status,
            } = issue;

            return (
              <div
                key={_id}
                className="bg-base-100 dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      image ||
                      "https://via.placeholder.com/600x400?text=No+Image+Available"
                    }
                    alt={title}
                    className="w-full h-[220px] object-cover"
                  />

                  {/* Status Badge */}
                  {status && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
                        status === "ongoing"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {status}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between text-left">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                    {description}
                  </p>

                  <h2 className="text-lg font-semibold text-green-600 mb-3">
                    ৳{amount}
                  </h2>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Tag size={16} />
                      <span className="capitalize">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{location}</span>
                    </div>
                  </div>

                  <Link
                    to={`/issueDetails/${_id}`}
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    See Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No issues found for this filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default Issues;
