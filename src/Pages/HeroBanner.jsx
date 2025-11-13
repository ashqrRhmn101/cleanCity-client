import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const images = [
  "https://i.ibb.co.com/KjZRkJwG/garbage-issue.jpg",
  "https://i.ibb.co.com/1YbwymQ5/community.jpg",
  "https://i.ibb.co.com/0jbMWRrS/sustainability.jpg",
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 s
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((p) => (p + 1) % images.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  return (
    <section className="max-w-7xl mx-auto mt-10 bg-white dark:bg-base-200 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center md:h-[400px]">
      {/* Left Text Column */}
      <div className="md:w-1/2 p-8 md:p-14 text-left space-y-5">
        <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 font-medium px-3 py-1 rounded-full text-sm">
          ❄ Community Feed
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Track Progress in <br />
          <span className="text-green-600">Your Area</span>
        </h1>

        <p className="text-gray-800 dark:text-gray-500 text-lg">
          Browse open and resolved issues, upvote priorities, and follow
          status updates in your neighborhood.
        </p>

        <Link to="/issues">
          <button className="mt-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-300 shadow-md">
            View Issues
          </button>
        </Link>
      </div>

      {/* Right Carousel Column */}
      <div className="relative md:w-1/2 w-full overflow-hidden bg-white">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full object-contain "
            />
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded-full shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded-full shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                current === i ? "bg-green-500 w-4" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
