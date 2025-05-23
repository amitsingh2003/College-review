import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const StreamsDegreeExplorer = () => {
  const [activeTab, setActiveTab] = useState("degree");
  const [activeCategory, setActiveCategory] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const degreeScrollRef = useRef(null);
  const streamsScrollRef = useRef(null);
  const categoryScrollRef = useRef(null);

  // Degree view data with enhanced styling
  const degreeData = [
    {
      title: "B.Tech",
      colleges: "318 colleges",
      icon: "🎓",
      gradient: "from-blue-500 to-cyan-400",
      shadowColor: "shadow-blue-100",
      locations: [
        "Andaman and Nicobar",
        "Assam",
        "Chhattisgarh",
        "Arunachal Pradesh",
        "Bihar",
        "Himachal Pradesh",
      ],
      description: "Bachelor of Technology",
    },
    {
      title: "M.Tech.",
      colleges: "139 colleges",
      icon: "⚙️",
      gradient: "from-purple-500 to-pink-400",
      shadowColor: "shadow-purple-100",
      locations: [
        "Arunachal Pradesh",
        "Bihar",
        "Himachal Pradesh",
        "Assam",
        "Chhattisgarh",
        "Jammu and Kashmir",
      ],
      description: "Master of Technology",
    },
    {
      title: "BBA",
      colleges: "174 colleges",
      icon: "👨‍💼",
      gradient: "from-green-500 to-emerald-400",
      shadowColor: "shadow-green-100",
      locations: [
        "Arunachal Pradesh",
        "Bihar",
        "Chhattisgarh",
        "Assam",
        "Chandigarh",
        "Himachal Pradesh",
      ],
      description: "Bachelor of Business Administration",
    },
    {
      title: "PGDM",
      colleges: "38 colleges",
      icon: "👨‍🎓",
      gradient: "from-orange-500 to-yellow-400",
      shadowColor: "shadow-orange-100",
      locations: [
        "Chhattisgarh",
        "Tamil Nadu",
        "Delhi",
        "Odisha",
        "Uttar Pradesh",
        "Karnataka",
      ],
      description: "Post Graduate Diploma in Management",
    },
    {
      title: "MBA",
      colleges: "245 colleges",
      icon: "📊",
      gradient: "from-indigo-500 to-purple-400",
      shadowColor: "shadow-indigo-100",
      locations: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Pune",
        "Hyderabad",
      ],
      description: "Master of Business Administration",
    },
    {
      title: "B.Sc",
      colleges: "425 colleges",
      icon: "🔬",
      gradient: "from-teal-500 to-green-400",
      shadowColor: "shadow-teal-100",
      locations: [
        "Karnataka",
        "Tamil Nadu",
        "Maharashtra",
        "Gujarat",
        "Rajasthan",
        "West Bengal",
      ],
      description: "Bachelor of Science",
    },
  ];

  // Streams view data with enhanced styling
  const streamsData = [
    {
      title: "Engineering",
      colleges: "342 Colleges",
      icon: "👷‍♂️",
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-100",
    },
    {
      title: "Management",
      colleges: "359 Colleges",
      icon: "👨‍💼",
      gradient: "from-orange-500 to-orange-600",
      shadowColor: "shadow-orange-100",
    },
    {
      title: "Medical",
      colleges: "78 Colleges",
      icon: "👨‍⚕️",
      gradient: "from-red-500 to-red-600",
      shadowColor: "shadow-red-100",
    },
    {
      title: "Science",
      colleges: "297 Colleges",
      icon: "🔬",
      gradient: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-100",
    },
    {
      title: "Law",
      colleges: "52 Colleges",
      icon: "⚖️",
      gradient: "from-green-500 to-green-600",
      shadowColor: "shadow-green-100",
    },
    {
      title: "Pharmacy",
      colleges: "68 Colleges",
      icon: "💊",
      gradient: "from-pink-500 to-pink-600",
      shadowColor: "shadow-pink-100",
    },
    {
      title: "Computer Application",
      colleges: "188 Colleges",
      icon: "💻",
      gradient: "from-indigo-500 to-indigo-600",
      shadowColor: "shadow-indigo-100",
    },
    {
      title: "Arts",
      colleges: "99 Colleges",
      icon: "🎨",
      gradient: "from-purple-500 to-violet-600",
      shadowColor: "shadow-purple-100",
    },
    {
      title: "Education",
      colleges: "34 Colleges",
      icon: "📚",
      gradient: "from-amber-500 to-amber-600",
      shadowColor: "shadow-amber-100",
    },
    {
      title: "Architecture",
      colleges: "76 Colleges",
      icon: "🏛️",
      gradient: "from-gray-500 to-gray-600",
      shadowColor: "shadow-gray-100",
    },
    {
      title: "Design",
      colleges: "28 Colleges",
      icon: "🎨",
      gradient: "from-rose-500 to-rose-600",
      shadowColor: "shadow-rose-100",
    },
    {
      title: "Commerce",
      colleges: "103 Colleges",
      icon: "📊",
      gradient: "from-teal-500 to-teal-600",
      shadowColor: "shadow-teal-100",
    },
    {
      title: "Dental",
      colleges: "8 Colleges",
      icon: "🦷",
      gradient: "from-cyan-500 to-cyan-600",
      shadowColor: "shadow-cyan-100",
    },
    {
      title: "Paramedical",
      colleges: "47 Colleges",
      icon: "🚑",
      gradient: "from-red-400 to-red-500",
      shadowColor: "shadow-red-100",
    },
    {
      title: "Agriculture",
      colleges: "5 Colleges",
      icon: "🌾",
      gradient: "from-green-400 to-green-500",
      shadowColor: "shadow-green-100",
    },
  ];

  const categories = [
    "Engineering",
    "Management",
    "Medical",
    "Science",
    "Law",
    "Pharmacy",
    "Computer Application",
  ];

  // Drag handlers for smooth scrolling
  const handleMouseDown = (e, ref) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    ref.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (ref) => {
    setIsDragging(false);
    ref.current.style.cursor = "grab";
  };

  const handleTouchStart = (e, ref) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleTouchMove = (e, ref) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 350;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToCategory = (index) => {
    setActiveCategory(index);
    if (categoryScrollRef.current) {
      const categoryWidth = 150;
      const scrollPosition =
        index * categoryWidth -
        categoryScrollRef.current.offsetWidth / 2 +
        categoryWidth / 2;
      categoryScrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const refs = [degreeScrollRef, streamsScrollRef, categoryScrollRef];
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.style.scrollBehavior = "smooth";
      }
    });
  }, []);

  const DegreeCard = ({ degree, index }) => (
    <div
      className={`group min-w-80 sm:min-w-96 bg-gray-100 rounded-3xl overflow-hidden transition-all duration-700 transform hover:scale-101 ${
        index === 0 ? "ml-4 sm:ml-0" : ""
      } ${index === degreeData.length - 1 ? "mr-4 sm:mr-0" : ""} 
    shadow-[inset_-12px_-8px_40px_#d9d9d9,inset_12px_8px_40px_#ffffff] 
    hover:shadow-[inset_-20px_-15px_60px_#c5c5c5,inset_20px_15px_60px_#ffffff] cursor-pointer`}
    >
      {/* Neomorphic Header */}
      <div className="p-4 sm:p-6 relative">
        <div
          className={`bg-gradient-to-r ${degree.gradient} rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden
          shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] 
          hover:shadow-[12px_12px_24px_#a8a8a8,-12px_-12px_24px_#ffffff] transition-all duration-500`}
        >
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-white opacity-20 rounded-full -translate-y-10 sm:-translate-y-14 translate-x-10 sm:translate-x-14"></div>
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-30 rounded-2xl flex items-center justify-center text-xl sm:text-2xl backdrop-blur-sm
              shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(0,0,0,0.1)]"
            >
              {degree.icon}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">
                {degree.title}
              </h3>
              <p className="text-white text-opacity-90 text-xs sm:text-sm">
                {degree.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">
                  {degree.colleges}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neomorphic Content */}
      <div className="p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center
              shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Available Locations
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {degree.locations.slice(0, 6).map((location, idx) => (
              <div
                key={idx}
                className="text-xs sm:text-sm text-gray-700 bg-gray-100 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 
                shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] 
                hover:shadow-[inset_6px_6px_12px_#a8a8a8,inset_-6px_-6px_12px_#ffffff] 
                transition-all duration-300 cursor-pointer"
              >
                {location}
              </div>
            ))}
          </div>
        </div>

        <button
          className="group/btn w-full bg-gray-100 text-gray-800 py-2.5 sm:py-3 px-4 sm:px-6 rounded-2xl 
          shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] 
          hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] 
          active:shadow-[inset_12px_12px_24px_#a8a8a8,inset_-12px_-12px_24px_#ffffff]
          transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
        >
          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          <span >Explore {degree.title} Colleges</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  const StreamCard = ({ stream, index }) => (
    <div
      className="group bg-gray-100 rounded-3xl overflow-hidden transition-all duration-700 transform hover:scale-105 cursor-pointer h-full
      shadow-[inset_-12px_-8px_40px_#d9d9d9,inset_12px_8px_40px_#ffffff]
      hover:shadow-[inset_-20px_-15px_60px_#c5c5c5,inset_20px_15px_60px_#ffffff]"
    >
      <div className="p-4 sm:p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-1">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${stream.gradient} rounded-2xl flex items-center justify-center text-xl sm:text-2xl text-white flex-shrink-0
            shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
            group-hover:shadow-[12px_12px_24px_#a8a8a8,-12px_-12px_24px_#ffffff]
            transition-all duration-500`}
          >
            {stream.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors truncate">
              {stream.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">
                {stream.colleges}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div
            className="flex-1 h-3 bg-gray-100 rounded-full relative overflow-hidden
            shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]"
          >
            <div
              className={`h-full bg-gradient-to-r ${stream.gradient} rounded-full transition-all duration-700 group-hover:w-full`}
              style={{ width: "30%" }}
            ></div>
          </div>
          <div
            className="ml-3 w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0
            shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]
            group-hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]
            transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Neomorphic Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium mb-4
            shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff]"
          >
            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            Educational Excellence
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 px-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Streams & Degrees
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Discover the perfect educational path from our extensive collection
            of programs and institutions
          </p>

          {/* Neomorphic Toggle */}
          <div
            className="inline-flex bg-gray-100 rounded-3xl p-1.5 sm:p-2 
            shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff]"
          >
            <button
              onClick={() => setActiveTab("streams")}
              className={`px-4 sm:px-8 py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-2 text-sm sm:text-base ${
                activeTab === "streams"
                  ? "bg-gray-100 text-blue-800 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] transform scale-95"
                  : "text-gray-600 hover:text-gray-800 hover:shadow-[4px_4px_8px_#d1d1d1,-4px_-4px_8px_#ffffff] hover:scale-105"
              }`}
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current opacity-60"></div>
              Streams
            </button>
            <button
              onClick={() => setActiveTab("degree")}
              className={`px-4 sm:px-8 py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-2 text-sm sm:text-base ${
                activeTab === "degree"
                  ? "bg-gray-100 text-blue-800 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] transform scale-95"
                  : "text-gray-600 hover:text-gray-800 hover:shadow-[4px_4px_8px_#d1d1d1,-4px_-4px_8px_#ffffff] hover:scale-105"
              }`}
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current opacity-60"></div>
              Degrees
            </button>
          </div>
        </div>

        {activeTab === "degree" && (
          <>
            {/* Neomorphic Category Navigation */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center justify-center gap-2 sm:gap-4 border-none">
                <div
                  ref={categoryScrollRef}
                  className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide max-w-full cursor-grab active:cursor-grabbing border-none"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  onMouseDown={(e) => handleMouseDown(e, categoryScrollRef)}
                  onMouseMove={(e) => handleMouseMove(e, categoryScrollRef)}
                  onMouseUp={() => handleMouseUp(categoryScrollRef)}
                  onMouseLeave={() => handleMouseUp(categoryScrollRef)}
                  onTouchStart={(e) => handleTouchStart(e, categoryScrollRef)}
                  onTouchMove={(e) => handleTouchMove(e, categoryScrollRef)}
                  onTouchEnd={() => setIsDragging(false)}
                >
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToCategory(index)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl whitespace-nowrap border-none font-medium transition-all duration-500 text-sm sm:text-base flex-shrink-0 ${
                        index === activeCategory
                          ? "bg-gray-100 text-blue-800 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] transform scale-95 "
                          : "bg-gray-100 text-gray-600 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#a8a8a8,-8px_-8px_16px_#ffffff] hover:scale-105 hover:text-gray-800"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Degree Cards */}
            <div className="relative">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
             

                <div
                  ref={degreeScrollRef}
                  className="flex gap-4 sm:gap-8 overflow-x-auto pb-4 max-w-full cursor-grab active:cursor-grabbing scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  onMouseDown={(e) => handleMouseDown(e, degreeScrollRef)}
                  onMouseMove={(e) => handleMouseMove(e, degreeScrollRef)}
                  onMouseUp={() => handleMouseUp(degreeScrollRef)}
                  onMouseLeave={() => handleMouseUp(degreeScrollRef)}
                  onTouchStart={(e) => handleTouchStart(e, degreeScrollRef)}
                  onTouchMove={(e) => handleTouchMove(e, degreeScrollRef)}
                  onTouchEnd={() => setIsDragging(false)}
                >
                  {degreeData.map((degree, index) => (
                    <DegreeCard key={index} degree={degree} index={index} />
                  ))}
                </div>

               
              </div>
            </div>
          </>
        )}

        {activeTab === "streams" && (
          <div className="relative">
            <div className="flex items-start justify-center gap-2 sm:gap-4">
              <div
                ref={streamsScrollRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-full pb-4 cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {streamsData.map((stream, index) => (
                  <StreamCard key={index} stream={stream} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Enhanced neomorphic animations */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-shadow {
          0%,
          100% {
            box-shadow: inset -12px -8px 40px #d9d9d9,
              inset 12px 8px 40px #ffffff;
          }
          50% {
            box-shadow: inset -20px -15px 60px #c5c5c5,
              inset 20px 15px 60px #ffffff;
          }
        }

        .group:hover {
          animation: float 3s ease-in-out infinite;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar for better UX */
        .scrollbar-custom::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #d1d1d1, #ffffff);
          border-radius: 10px;
          box-shadow: inset 2px 2px 4px #bebebe, inset -2px -2px 4px #ffffff;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #bebebe, #ffffff);
        }
      `}</style>
    </div>
  );
};

export default StreamsDegreeExplorer;
