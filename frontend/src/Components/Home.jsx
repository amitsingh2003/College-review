import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const Home = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Animated text options - only the changing part
  const animatedTexts = [
    "Latest News & Updates",
    "India's Top Colleges",
    "India's Top Exams",
    "India's Top Courses",
    "Colleges Review & Ratings",
    "Scholarship Opportunities",
  ];

  // Background images for college/education theme
  const backgroundImages = [
    "https://images.unsplash.com/photo-1618255630366-f402c45736f6?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1543193158-07c01963e800?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561089489-f13d5e730d72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1621440936352-e4d66287abdb?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1672264032392-383ccb8a7fdc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1590119778271-9a72b0930bd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505664063603-28e48ca204eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1743529056611-2b7b01658893?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1690436635935-7fa464433788?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1695943138682-c2fe56c6a743?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1645017748972-29b42eac8c05?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1651993543504-634ca7ec6925?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1535438904202-5fe1b38b6304?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1642617206911-f39b50e3c1c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1595439682741-b982f527ee62?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1643479228289-938bb58e867c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  // Text animation effect with smoother transitions
  useEffect(() => {
    const textInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
        setIsVisible(true);
      }, 500);
    }, 3500);

    return () => clearInterval(textInterval);
  }, []);

  // Background image animation
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  // Animated stats with counters
  const [stats, setStats] = useState({
    colleges: 0,
    reviews: 0,
    exams: 0,
    courses: 0,
  });

  const targetStats = {
    colleges: 1500,
    reviews: 50000,
    exams: 180,
    courses: 850,
  };

  useEffect(() => {
    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setStats({
        colleges: Math.floor(targetStats.colleges * easeOut),
        reviews: Math.floor(targetStats.reviews * easeOut),
        exams: Math.floor(targetStats.exams * easeOut),
        courses: Math.floor(targetStats.courses * easeOut),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden pt-20 pb-12">
      {/* Animated Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out transform ${
            index === currentImageIndex
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-110 z-0"
          }`}
          style={{
            backgroundColor: "#000", // fallback background
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter:
              index === currentImageIndex
                ? "blur(0px) brightness(1) contrast(1.05)"
                : "blur(2px) brightness(0.8) contrast(0.9)",
            transition:
              "all 3s cubic-bezier(0.4, 0, 0.2, 1), filter 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform, opacity, filter",
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-[2500ms] ease-in-out"
            style={{
              background:
                index === currentImageIndex
                  ? "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.5) 100%)"
                  : "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.75) 100%)",
              backdropFilter: "blur(0.5px)",
            }}
          />

          {/* Radial darkening overlay */}
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-out"
            style={{
              background:
                "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.3) 80%)",
              opacity: index === currentImageIndex ? 0.6 : 0.8,
            }}
          />
        </div>
      ))}

      <div className="text-center px-6 max-w-6xl relative z-10">
        <div className="mb-8">
          <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <div className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-2">
              Search & Explore
            </div>

            {/* Adjusted height to reduce vertical space */}
            <div className="relative overflow-hidden h-10 md:h-12 lg:h-14 flex items-center justify-center">
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out transform ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95"
                }`}
              >
                <span className="bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent font-extrabold drop-shadow-lg text-center text-lg md:text-xl lg:text-4xl">
                  {animatedTexts[currentTextIndex]}
                </span>
              </div>
            </div>
          </h1>
        </div>

        {/* Neomorphic Search Bar (Wider & Taller) */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/70 
      hover:text-blue-400 hover:scale-110 transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Search colleges, exams, courses..."
              className="w-full pl-14 pr-8 py-4 text-base text-white bg-white/10 rounded-full outline-none 
      transition-all duration-300 backdrop-blur-xl placeholder:text-white/60
      shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(255,255,255,0.2)]
      hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.15),inset_0_-1px_2px_rgba(255,255,255,0.3)]
      focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(255,255,255,0.4)]
      focus:scale-[1.02] focus:bg-white/15 hover:bg-white/15 placeholder:text-base"
            />
          </div>
        </div>

        {/* Compact Animated Stats Grid - Made Slightly Larger */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
  <div className="text-center group cursor-pointer">
    <div
      className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 md:p-5
      shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05),0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.04)]
      border-[0.5px] border-white/10
      hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(255,255,255,0.08),0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]
      hover:scale-[1.02] hover:bg-white/8
      transition-all duration-700 ease-out
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100"
    >
      <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300 drop-shadow-lg">
        {stats.colleges.toLocaleString()}+
      </div>
      <div className="text-white/70 font-medium text-sm tracking-wide">Colleges</div>
    </div>
  </div>

  <div className="text-center group cursor-pointer">
    <div
      className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 md:p-5
      shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05),0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.04)]
      border-[0.5px] border-white/10
      hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(255,255,255,0.08),0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]
      hover:scale-[1.02] hover:bg-white/8
      transition-all duration-700 ease-out
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100"
    >
      <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-lg">
        {stats.reviews.toLocaleString()}+
      </div>
      <div className="text-white/70 font-medium text-sm tracking-wide">Reviews</div>
    </div>
  </div>

  <div className="text-center group cursor-pointer">
    <div
      className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 md:p-5
      shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05),0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.04)]
      border-[0.5px] border-white/10
      hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(255,255,255,0.08),0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]
      hover:scale-[1.02] hover:bg-white/8
      transition-all duration-700 ease-out
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100"
    >
      <div className="text-2xl md:text-3xl font-bold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors duration-300 drop-shadow-lg">
        {stats.exams}+
      </div>
      <div className="text-white/70 font-medium text-sm tracking-wide">Exams</div>
    </div>
  </div>

  <div className="text-center group cursor-pointer">
    <div
      className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 md:p-5
      shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05),0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.04)]
      border-[0.5px] border-white/10
      hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(255,255,255,0.08),0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]
      hover:scale-[1.02] hover:bg-white/8
      transition-all duration-700 ease-out
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100"
    >
      <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors duration-300 drop-shadow-lg">
        {stats.courses}+
      </div>
      <div className="text-white/70 font-medium text-sm tracking-wide">Courses</div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default Home;