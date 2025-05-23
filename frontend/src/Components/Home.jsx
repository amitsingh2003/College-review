import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Notifications from "./Notifications";

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
    // Classic university architecture
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070", // University courtyard
    "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2070", // Modern campus walkway

    // Libraries & Study Spaces
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2070", // Grand library interior
    "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070", // Library reading area

    // Students & Learning
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070", // Students collaborating
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070", // Graduation ceremony
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070", // Students in lecture hall
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070", // Students with laptops

    // Academic & Knowledge
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2070", // Open books
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070", // Study desk setup

    // Science & Technology
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070", // Science laboratory
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=2070", // Computer lab
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070", // Innovation/tech theme
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
          className={`absolute inset-0 transition-all duration-3000 ease-in-out ${
            index === currentImageIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(30,58,138,0.8) 0%, rgba(59,130,246,0.6) 50%, rgba(0,0,0,0.7) 100%), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
      ))}

      <div className="text-center px-6 max-w-6xl relative z-10">
        <div className="mb-8">
          <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <div className="text-white drop-shadow-2xl mb-2">
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
                <span className="bg-gradient-to-r from-orange-700 via-blue-200 to-green-600 bg-clip-text text-transparent font-extrabold drop-shadow-lg text-center text-lg md:text-xl lg:text-4xl">
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
              className="bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-5
              shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)] 
              border border-white/20 
              hover:shadow-[inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.15)] 
              hover:scale-105 hover:bg-white/15 transition-all duration-500"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {stats.colleges.toLocaleString()}+
              </div>
              <div className="text-white/80 font-medium text-sm">Colleges</div>
            </div>
          </div>

          <div className="text-center group cursor-pointer">
            <div
              className="bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-5
              shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)] 
              border border-white/20 
              hover:shadow-[inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.15)] 
              hover:scale-105 hover:bg-white/15 transition-all duration-500"
            >
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                {stats.reviews.toLocaleString()}+
              </div>
              <div className="text-white/80 font-medium text-sm">Reviews</div>
            </div>
          </div>

          <div className="text-center group cursor-pointer">
            <div
              className="bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-5
              shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)] 
              border border-white/20 
              hover:shadow-[inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.15)] 
              hover:scale-105 hover:bg-white/15 transition-all duration-500"
            >
              <div className="text-2xl md:text-3xl font-bold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                {stats.exams}+
              </div>
              <div className="text-white/80 font-medium text-sm">Exams</div>
            </div>
          </div>

          <div className="text-center group cursor-pointer">
            <div
              className="bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-5
              shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)] 
              border border-white/20 
              hover:shadow-[inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.15)] 
              hover:scale-105 hover:bg-white/15 transition-all duration-500"
            >
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {stats.courses}+
              </div>
              <div className="text-white/80 font-medium text-sm">Courses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
