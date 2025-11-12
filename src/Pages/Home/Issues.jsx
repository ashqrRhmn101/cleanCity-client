import React from "react";
import { useLoaderData, Link } from "react-router";
import { ArrowRight, MapPin, Tag } from "lucide-react";

const Issues = () => {
  const data = useLoaderData();
  // console.log("All Issues Data:", data);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold my-6 text-center">
        ALL Issues
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 py-6">
        {data.map((issue) => {
          const { _id, title, description, category, location, image,amount } = issue;

          return (
            <div
              key={_id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Image */}
              <div className="w-full h-[200px] overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between">
                <div className="flex items-center  justify-between text-gray-800 dark:text-white">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {title}
                </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {description}
                </p>
                <h2 className="text-xl font-semibold text-green-600 mb-3">${amount}</h2>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Tag size={16} />
                    <span>{category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
    </div>
  );
};

export default Issues;
