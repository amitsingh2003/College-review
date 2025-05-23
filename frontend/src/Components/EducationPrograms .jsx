import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  Globe,
  BookOpen,
  GraduationCap,
  Calendar,
  Users,
  Star,
  Award,
  ArrowRight,
  ExternalLink,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";

const EducationPrograms = () => {
  const [activeProgram, setActiveProgram] = useState("BBA");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);

  const programs = [
    "B.Tech",
    "M.Tech",
    "BBA",
    "PGDM",
    "MBBS",
    "BPT",
    "BAMS",
    "BHMS",
    "MD",
    "B.Sc",
    "M.Sc",
    "BA LLB",
    "LLM",
    "B.Pharm",
  ];

  const collegesData = {
    BBA: [
      {
        name: "IIM Bangalore",
        location: "Bangalore",
        rating: 4.8,
        fees: "₹23L",
        rank: "#1",
      },
      {
        name: "Christ University",
        location: "Bangalore",
        rating: 4.5,
        fees: "₹12L",
        rank: "#2",
      },
      {
        name: "Symbiosis Pune",
        location: "Pune",
        rating: 4.6,
        fees: "₹15L",
        rank: "#3",
      },
      {
        name: "NMIMS Mumbai",
        location: "Mumbai",
        rating: 4.7,
        fees: "₹18L",
        rank: "#4",
      },
    ],
  };

  const examsData = [
    {
      name: "GMAT",
      icon: "🎯",
      nextDate: "Dec 15",
      difficulty: "Hard",
      registrations: "50K+",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      description: "Graduate Management Admission Test",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "CAT",
      icon: "📊",
      nextDate: "Nov 26",
      difficulty: "Hard",
      registrations: "2.3L+",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Common Admission Test",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "MAT",
      icon: "📝",
      nextDate: "Jan 8",
      difficulty: "Medium",
      registrations: "80K+",
      image:
        "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
      description: "Management Aptitude Test",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "XAT",
      icon: "⚡",
      nextDate: "Jan 5",
      difficulty: "Hard",
      registrations: "95K+",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop",
      description: "Xavier Aptitude Test",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const studyAbroadData = [
    {
      country: "USA",
      flag: "🇺🇸",
      universities: "2000+",
      avgFees: "$45K",
      scholarships: "68%",
      image:
        "https://i.pinimg.com/736x/66/5a/a8/665aa802d6c721448061d2e9c58a31fc.jpg",
      description: "Top universities & research opportunities",
      gradient: "from-red-500 to-blue-600",
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      universities: "800+",
      avgFees: "$35K",
      scholarships: "78%",
      image:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=300&fit=crop",
      description: "Affordable education & immigration",
      gradient: "from-red-500 to-red-600",
    },
    {
      country: "UK",
      flag: "🇬🇧",
      universities: "1200+",
      avgFees: "£38K",
      scholarships: "70%",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
      description: "Historic excellence & global recognition",
      gradient: "from-blue-500 to-red-600",
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      universities: "1000+",
      avgFees: "$42K",
      scholarships: "85%",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "Innovation hub & lifestyle balance",
      gradient: "from-yellow-500 to-green-600",
    },
  ];

  // Mouse and touch handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("mouseleave", handleMouseUp);
      scrollContainer.style.scrollBehavior = "smooth";
      return () => {
        scrollContainer.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)",
      }}
    >
      {/* Neomorphic Header */}
      <div className="pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 rounded-2xl sm:rounded-3xl
            shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff]"
          >
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              Premium Education Platform
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight px-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Programs
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Discover your perfect educational journey with world-class programs
          </p>
        </div>
      </div>

      {/* Neomorphic Program Tabs - Smooth Scroll */}
      <div className="px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <button
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({
                    left: -200,
                    behavior: "smooth",
                  });
                }
              }}
              className="p-2 sm:p-3 bg-gray-100 rounded-2xl transition-all duration-300 flex-shrink-0
                shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]
                hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                active:shadow-[inset_8px_8px_16px_#a8a8a8,inset_-8px_-8px_16px_#ffffff]"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-2 max-w-full"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {programs.map((program) => (
                <button
                  key={program}
                  onClick={() => setActiveProgram(program)}
                  className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-500 text-sm sm:text-base ${
                    activeProgram === program
                      ? "bg-gray-100 text-blue-800 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] transform scale-95"
                      : "bg-gray-100 text-gray-600 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#a8a8a8,-8px_-8px_16px_#ffffff] hover:scale-105 hover:text-gray-800"
                  }`}
                  style={{ userSelect: "none" }}
                >
                  {program}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
                }
              }}
              className="p-2 sm:p-3 bg-gray-100 rounded-2xl transition-all duration-300 flex-shrink-0
                shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]
                hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                active:shadow-[inset_8px_8px_16px_#a8a8a8,inset_-8px_-8px_16px_#ffffff]"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>

          <div className="text-center"></div>
        </div>
      </div>

      {/* Neomorphic Main Cards */}
      <div className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Find Colleges Card */}
          <div
            className="group bg-gray-100 rounded-3xl p-1 sm:p-1.5 transition-all duration-700 transform hover:scale-105
            shadow-[inset_-12px_-8px_40px_#d9d9d9,inset_12px_8px_40px_#ffffff]
            hover:shadow-[inset_-20px_-15px_60px_#c5c5c5,inset_20px_15px_60px_#ffffff]"
          >
            <div
              className="bg-gray-100 rounded-3xl overflow-hidden h-full
              shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
              group-hover:shadow-[12px_12px_24px_#a8a8a8,-12px_-12px_24px_#ffffff]"
            >
              {/* Neomorphic Header with Image */}
              <div
                className="relative h-40 sm:h-48 overflow-hidden m-3 sm:m-4 rounded-2xl
                shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]"
              >
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop"
                  alt="College Campus"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center
                      shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(0,0,0,0.1)]"
                    >
                      <Search className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold">
                        Find Colleges
                      </h3>
                      <p className="text-xs sm:text-sm opacity-90">
                        15,000+ institutions worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neomorphic Content */}
              <div className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {collegesData.BBA?.slice(0, 3).map((college, index) => (
                    <div
                      key={index}
                      className="group/item flex items-center justify-between p-3 sm:p-4 bg-gray-100 rounded-2xl transition-all duration-300
                      shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                      hover:shadow-[inset_12px_12px_24px_#a8a8a8,inset_-12px_-12px_24px_#ffffff]"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {college.name}
                          </h4>
                          <span
                            className="text-xs bg-gray-100 text-blue-600 px-2 py-1 rounded-full font-medium flex-shrink-0
                            shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]"
                          >
                            {college.rank}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{college.location}</span>
                          </span>
                          <span className="font-medium text-green-600 flex-shrink-0">
                            {college.fees}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-sm">
                          {college.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="group/btn w-full p-3 sm:p-4 bg-gray-100 text-gray-800 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base
                  shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
                  hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                  active:shadow-[inset_12px_12px_24px_#a8a8a8,inset_-12px_-12px_24px_#ffffff]"
                >
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Explore All Colleges
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Exams Card */}
          <div
            className="group bg-gray-100 rounded-3xl p-1 sm:p-1.5 transition-all duration-700 transform hover:scale-105
            shadow-[inset_-12px_-8px_40px_#d9d9d9,inset_12px_8px_40px_#ffffff]
            hover:shadow-[inset_-20px_-15px_60px_#c5c5c5,inset_20px_15px_60px_#ffffff]"
          >
            <div
              className="bg-gray-100 rounded-3xl overflow-hidden h-full
              shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
              group-hover:shadow-[12px_12px_24px_#a8a8a8,-12px_-12px_24px_#ffffff]"
            >
              {/* Neomorphic Header with Image */}
              <div
                className="relative h-40 sm:h-48 overflow-hidden m-3 sm:m-4 rounded-2xl
                shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]"
              >
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
                  alt="Exam Preparation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center
                      shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(0,0,0,0.1)]"
                    >
                      <Target className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold">
                        Entrance Exams
                      </h3>
                      <p className="text-xs sm:text-sm opacity-90">
                        Prepare for success
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neomorphic Content */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {examsData.slice(0, 4).map((exam, index) => (
                    <div
                      key={index}
                      className="group/item p-3 sm:p-4 bg-gray-100 rounded-2xl transition-all duration-300
                      shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                      hover:shadow-[inset_12px_12px_24px_#a8a8a8,inset_-12px_-12px_24px_#ffffff]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${exam.gradient} rounded-xl flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0
                          shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]`}
                        >
                          {exam.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {exam.name}
                          </h4>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-1 mb-2">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span>{exam.nextDate}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium inline-block
                        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] ${
                          exam.difficulty === "Hard"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {exam.difficulty}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="group/btn w-full p-3 sm:p-4 bg-gray-100 text-gray-800 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base
                  shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
                  hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                  active:shadow-[inset_12px_12px_24px_#a8a8a8,inset_-12px_-12px_24px_#ffffff]"
                >
                  <Target className="w-4 h-4 text-blue-500" />
                  View All Exams
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Study Abroad Card */}
          <div
            className="group bg-gray-100 rounded-3xl p-1 sm:p-1.5 transition-all duration-700 transform hover:scale-105
            shadow-[inset_-12px_-8px_40px_#d9d9d9,inset_12px_8px_40px_#ffffff]
            hover:shadow-[inset_-20px_-15px_60px_#c5c5c5,inset_20px_15px_60px_#ffffff]"
          >
            <div
              className="bg-gray-100 rounded-3xl overflow-hidden h-full
              shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
              group-hover:shadow-[12px_12px_24px_#a8a8a8,-12px_-12px_24px_#ffffff]"
            >
              {/* Neomorphic Header with Image */}
              <div
                className="relative h-40 sm:h-48 overflow-hidden m-3 sm:m-4 rounded-2xl
                shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]"
              >
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
                  alt="Study Abroad"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center
                      shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(0,0,0,0.1)]"
                    >
                      <Globe className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold">
                        Study Abroad
                      </h3>
                      <p className="text-xs sm:text-sm opacity-90">
                        Global education opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neomorphic Content */}
              <div className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {studyAbroadData.slice(0, 3).map((country, index) => (
                    <div
                      key={index}
                      className="group/item flex items-center justify-between p-3 sm:p-4 bg-gray-100 rounded-2xl transition-all duration-300
                      shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                      hover:shadow-[inset_12px_12px_24px_#a8a8a8,inset_-12px_-12px_24px_#ffffff]"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                          <img
                            src={country.image}
                            alt={country.country}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {country.country}
                          </h4>
                          <div className="text-xs text-gray-600 truncate">
                            {country.universities} universities
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="font-medium text-green-600 text-sm">
                          {country.avgFees}
                        </span>
                        <span
                          className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full
                          shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]"
                        >
                          {country.scholarships} scholarships
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="group/btn w-full p-3 sm:p-4 bg-gray-100 text-gray-800 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base
                  shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
                  hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                  active:shadow-[inset_12px_12px_24px_#a8a8a8,inset_-12px_-12px_24px_#ffffff]"
                >
                  <Globe className="w-4 h-4 text-blue-500" />
                  Explore Study Abroad
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPrograms;
