import React, { useState, useEffect } from "react";
import {
  Search,
  Grid3X3,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Building,
  Globe,
  FileText,
  MessageCircle,
  MapPin,
  Award,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import collegeData from "../assets/College.json";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);
  const [discoverDropdown, setDiscoverDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");

      setSearchFocused(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };
  const handleCollegeClick = (collegeName) => {
    const college = collegeData.find(
      (college) => college.name.toLowerCase() === collegeName.toLowerCase()
    );
    if (college) {
      // Create a URL-friendly slug from college name
      const collegeSlug = college.name.toLowerCase().replace(/\s+/g, "-");
      navigate(`/college/${collegeSlug}`, { state: { collegeData: college } });
      setExploreDropdown(false); // Close dropdown
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const exploreOptions = [
    {
      name: "Engineering",
      icon: <Building className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Management",
      icon: <BookOpen className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Medical",
      icon: <FileText className="w-4 h-4" />,
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Science",
      icon: <Award className="w-4 h-4" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Law",
      icon: <BookOpen className="w-4 h-4" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Pharmacy",
      icon: <FileText className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const collegesData = [
    {
      name: "IIT Madras",
      location: "Chennai",
      rating: "9.6",
      fees: "₹2.3L",
    },
    {
      name: "IIT Delhi",
      location: "New Delhi",
      rating: "9.4",
      fees: "₹2.6L",
    },
    {
      name: "IIT Bombay",
      location: "Mumbai",
      rating: "9.5",
      fees: "₹2.7L",
    },
    {
      name: "IIT Kharagpur",
      location: "Kharagpur",
      rating: "9.2",
      fees: "₹2.5L",
    },
    {
      name: "IIT Kanpur",
      location: "Kanpur",
      rating: "9.3",
      fees: "₹2.4L",
    },
    {
      name: "IIT Roorkee",
      location: "Roorkee",
      rating: "9.1",
      fees: "₹2.4L",
    },
    {
      name: "IIT Guwahati",
      location: "Guwahati",
      rating: "9.0",
      fees: "₹2.3L",
    },
    {
      name: "IIT Hyderabad",
      location: "Hyderabad",
      rating: "8.9",
      fees: "₹2.2L",
    },
    {
      name: "IIT BHU",
      location: "Varanasi",
      rating: "8.8",
      fees: "₹2.2L",
    },
    {
      name: "IIT Indore",
      location: "Indore",
      rating: "8.7",
      fees: "₹2.1L",
    },
  ];

  const statesData = [
    { name: "Tamil Nadu", colleges: "450+" },
    { name: "Uttar Pradesh", colleges: "380+" },
    { name: "Delhi", colleges: "220+" },
    { name: "Karnataka", colleges: "340+" },
  ];

  const examsData = [
    { name: "JEE Main 2025", date: "Jan 2025", type: "Engineering" },
    { name: "JEE Advanced 2025", date: "May 2025", type: "Engineering" },
    { name: "NEET 2025", date: "May 2025", type: "Medical" },
    { name: "CUET 2025", date: "May 2025", type: "General" },
  ];

  const discoverOptions = [
    {
      name: "Study Abroad",
      icon: <Globe className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
      desc: "Global opportunities",
    },
    {
      name: "Top Colleges",
      icon: <Building className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-500",
      desc: "Best institutions",
    },
    {
      name: "Entrance Exams",
      icon: <FileText className="w-4 h-4" />,
      color: "from-purple-500 to-indigo-500",
      desc: "Exam preparation",
    },
    {
      name: "Course Finder",
      icon: <BookOpen className="w-4 h-4" />,
      color: "from-amber-500 to-orange-500",
      desc: "Find your path",
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
        <div
          className={`max-w-6xl mx-auto rounded-2xl backdrop-blur-3xl transition-all duration-700 ease-out
            ${
              isScrolled
                ? "bg-white/15 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 "
                : "bg-white/2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] border-transparent"
            }`}
        >
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between h-12 lg:h-14">
              <div className="flex items-center flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <img
                    src={logo}
                    alt="SCS Global Logo"
                    className="h-8 w-auto"
                    onError={(e) => {
                      console.log("Logo failed to load");
                      e.target.style.display = "none";
                    }}
                  />
                  <Link
                    to="/"
                    className={`text-lg font-extrabold ${
                      isScrolled ? "text-blue-500" : "text-white"
                    }`}
                  >
                    SCS GLOBAL
                  </Link>
                </div>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
                {/* Explore Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setExploreDropdown(true)}
                  onMouseLeave={() => setExploreDropdown(false)}
                >
                  <button
                    className={`flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
                      isScrolled
                        ? "text-blue-500 hover:text-blue-700"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span className="font-extrabold">Explore Programs</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        exploreDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-3 w-[850px] z-50">
                    {exploreDropdown && (
                      <div className="relative">
                        <div
                          className="backdrop-blur-3xl rounded-[2rem] border border-white/30 p-6 animate-in slide-in-from-top-5 duration-300 ease-out
            shadow-[0_32px_64px_rgba(59,130,246,0.08),0_16px_32px_rgba(147,197,253,0.12),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(255,255,255,0.4)]
            before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-white/70 before:via-white/40 before:to-white/20 before:backdrop-blur-sm before:-z-10
            after:absolute after:inset-[1px] after:rounded-[calc(2rem-1px)] after:bg-gradient-to-br after:from-transparent after:via-white/20 after:to-transparent after:pointer-events-none"
                          style={{
                            backdropFilter:
                              "blur(40px) saturate(1.8) brightness(1.1)",
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.75) 100%)",
                            boxShadow:
                              "0 32px 64px rgba(59,130,246,0.08), 0 16px 32px rgba(147,197,253,0.12), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(255,255,255,0.6)",
                          }}
                        >
                          {/* Inner content */}
                          <div className="relative z-10">
                            <div className="grid grid-cols-8 gap-6">
                              {/* Categories */}
                              <div className="col-span-2">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                                    Programs
                                  </h3>
                                </div>
                                <div className="space-y-2">
                                  {exploreOptions.map((option, index) => (
                                    <div
                                      key={index}
                                      className="group/explore p-3 rounded-2xl cursor-pointer transition-all duration-300 ease-out
                        hover:bg-gradient-to-br hover:from-white/80 hover:via-white/60 hover:to-white/70
                        hover:shadow-[0_8px_32px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.5)]
                        hover:scale-[1.03] hover:backdrop-blur-xl
                        active:scale-[0.97] active:shadow-[0_4px_16px_rgba(59,130,246,0.1)]
                        relative overflow-hidden
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300
                        hover:before:opacity-100"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div
                                          className={`w-8 h-8 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-white 
                            shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.5)]
                            group-hover/explore:shadow-[0_8px_24px_rgba(0,0,0,0.25),inset_0_2px_4px_rgba(255,255,255,0.7)]
                            group-hover/explore:scale-110 transition-all duration-300 ease-out
                            relative overflow-hidden
                            before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-transparent before:opacity-60`}
                                        >
                                          {option.icon}
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800 group-hover/explore:text-blue-600 transition-colors duration-200">
                                          {option.name}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Colleges */}
                              <div className="col-span-3">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                                    Top Colleges
                                  </h3>
                                </div>
                                <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
                                  {collegesData.map((college, index) => (
                                    <div
                                      key={index}
                                      onClick={() =>
                                        handleCollegeClick(college.name)
                                      }
                                      className="group/college p-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out
      hover:bg-gradient-to-br hover:from-white/80 hover:via-white/60 hover:to-white/70
      hover:shadow-[0_12px_40px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.5)]
      hover:scale-[1.02] hover:backdrop-blur-xl
      active:scale-[0.98] active:shadow-[0_6px_20px_rgba(16,185,129,0.08)]
      relative overflow-hidden
      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-100"
                                    >
                                      {/* Rest of the college display content remains the same */}
                                      <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                          <div className="text-sm font-semibold text-gray-800 group-hover/college:text-emerald-600 transition-colors duration-200 truncate mb-1">
                                            {college.name}
                                          </div>
                                          <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                                              <MapPin className="w-3 h-3 flex-shrink-0" />
                                              <span className="truncate">
                                                {college.location}
                                              </span>
                                            </span>
                                            <span
                                              className="text-xs font-semibold text-emerald-700 bg-gradient-to-br from-emerald-50/90 to-emerald-100/70 px-2 py-1 rounded-full whitespace-nowrap
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_8px_rgba(16,185,129,0.1)]
            backdrop-blur-sm border border-emerald-100/50"
                                            >
                                              ⭐ {college.rating}
                                            </span>
                                          </div>
                                        </div>
                                        <div
                                          className="text-sm font-semibold text-gray-700 bg-gradient-to-br from-gray-50/90 to-gray-100/70 px-3 py-1.5 rounded-full ml-3 whitespace-nowrap
        shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.05)]
        backdrop-blur-sm border border-gray-100/50"
                                        >
                                          {college.fees}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* States */}
                              <div className="col-span-2">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                                    By State
                                  </h3>
                                </div>
                                <div className="space-y-2">
                                  {statesData.map((state, index) => (
                                    <div
                                      key={index}
                                      className="group/state p-3 rounded-2xl cursor-pointer transition-all duration-300 ease-out
                        hover:bg-gradient-to-br hover:from-white/80 hover:via-white/60 hover:to-white/70
                        hover:shadow-[0_8px_32px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.5)]
                        hover:scale-[1.03] hover:backdrop-blur-xl
                        active:scale-[0.97] active:shadow-[0_4px_16px_rgba(139,92,246,0.1)]
                        relative overflow-hidden
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300
                        hover:before:opacity-100"
                                    >
                                      <div className="text-sm font-semibold text-gray-800 group-hover/state:text-purple-600 transition-colors duration-200 mb-1">
                                        {state.name}
                                      </div>
                                      <div className="text-xs text-gray-600 font-medium">
                                        {state.colleges} colleges
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Exams */}
                              <div className="col-span-1">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                                    Exams
                                  </h3>
                                </div>
                                <div className="space-y-2">
                                  {examsData.map((exam, index) => (
                                    <div
                                      key={index}
                                      className="group/exam p-3 rounded-2xl cursor-pointer transition-all duration-300 ease-out
                        hover:bg-gradient-to-br hover:from-white/80 hover:via-white/60 hover:to-white/70
                        hover:shadow-[0_8px_32px_rgba(245,158,11,0.15),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.5)]
                        hover:scale-[1.03] hover:backdrop-blur-xl
                        active:scale-[0.97] active:shadow-[0_4px_16px_rgba(245,158,11,0.1)]
                        relative overflow-hidden
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300
                        hover:before:opacity-100"
                                    >
                                      <div className="text-sm font-semibold text-gray-800 group-hover/exam:text-amber-600 transition-colors duration-200 mb-1">
                                        {exam.name}
                                      </div>
                                      <div className="text-xs text-gray-600 font-medium">
                                        {exam.date}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Water droplet decorative elements */}
                          <div
                            className="absolute top-6 right-6 w-16 h-12 bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-blue-500/10 rounded-full blur-md transform rotate-12
            shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]"
                          ></div>
                          <div
                            className="absolute bottom-8 left-8 w-12 h-16 bg-gradient-to-br from-emerald-400/20 via-teal-300/15 to-emerald-500/10 rounded-full blur-sm transform -rotate-12
            shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]"
                          ></div>
                          <div
                            className="absolute top-1/2 left-1/3 w-8 h-8 bg-gradient-to-br from-purple-400/15 via-indigo-300/10 to-purple-500/8 rounded-full blur-sm
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)]"
                          ></div>

                          {/* Floating water bubbles */}
                          <div className="absolute top-12 right-20 w-3 h-3 bg-white/40 rounded-full blur-[1px] animate-pulse"></div>
                          <div className="absolute bottom-16 left-20 w-2 h-2 bg-white/30 rounded-full blur-[1px] animate-pulse delay-300"></div>
                          <div className="absolute top-20 left-1/2 w-1.5 h-1.5 bg-white/35 rounded-full blur-[0.5px] animate-pulse delay-700"></div>
                        </div>

                        {/* Enhanced water droplet glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-cyan-300/6 to-purple-500/8 rounded-[2rem] blur-2xl -z-10"></div>
                        <div className="absolute inset-2 bg-gradient-to-tr from-white/20 via-transparent to-white/10 rounded-[1.5rem] blur-xl -z-10"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Bar - Only neomorphism element inside navbar */}
                <div className="flex-1 max-w-sm">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                          searchFocused
                            ? "text-blue-500 scale-110"
                            : isScrolled
                            ? "text-blue-700"
                            : "text-blue-500"
                        }`}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search colleges, exams, courses..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-full outline-none transition-all duration-300
          backdrop-blur-xl placeholder:text-xs
          shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(255,255,255,0.2)]
          hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.15),inset_0_-1px_2px_rgba(255,255,255,0.3)] 
          focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(255,255,255,0.4)] 
          focus:scale-[1.02] ${
            isScrolled
              ? "bg-white/40 text-gray-900 placeholder-gray-500"
              : "bg-white/10 text-white placeholder-white/60"
          }`}
                      />
                    </div>
                  </form>
                </div>

                {/* Discover Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setDiscoverDropdown(true)}
                  onMouseLeave={() => setDiscoverDropdown(false)}
                >
                  {/* Button */}
                  <button
                    className={`flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
                      isScrolled
                        ? "text-blue-500 hover:text-blue-700"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4 font-bold transition-transform duration-300 group-hover:rotate-12" />
                    <span className="font-extrabold">Discover</span>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full right-0 mt-3 w-96 z-50">
                    {discoverDropdown && (
                      <div className="relative">
                        <div
                          className="backdrop-blur-3xl rounded-[2rem] border border-white/30 p-6 animate-in slide-in-from-top-5 duration-300 ease-out
            shadow-[0_32px_64px_rgba(59,130,246,0.08),0_16px_32px_rgba(147,197,253,0.12),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(255,255,255,0.4)]
            before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-white/70 before:via-white/40 before:to-white/20 before:backdrop-blur-sm before:-z-10
            after:absolute after:inset-[1px] after:rounded-[calc(2rem-1px)] after:bg-gradient-to-br after:from-transparent after:via-white/20 after:to-transparent after:pointer-events-none"
                          style={{
                            backdropFilter:
                              "blur(40px) saturate(1.8) brightness(1.1)",
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.75) 100%)",
                            boxShadow:
                              "0 32px 64px rgba(59,130,246,0.08), 0 16px 32px rgba(147,197,253,0.12), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(255,255,255,0.6)",
                          }}
                        >
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                                Discover More
                              </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {discoverOptions.map((option, index) => (
                                <div
                                  key={index}
                                  className="group/discover p-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out
                    hover:bg-gradient-to-br hover:from-white/80 hover:via-white/60 hover:to-white/70
                    hover:shadow-[0_12px_40px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.5)]
                    hover:scale-[1.03] hover:backdrop-blur-xl
                    active:scale-[0.97] active:shadow-[0_6px_20px_rgba(59,130,246,0.08)]
                    relative overflow-hidden
                    before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300
                    hover:before:opacity-100"
                                >
                                  <div
                                    className={`w-10 h-10 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-white mb-3
                      shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.5)]
                      group-hover/discover:shadow-[0_8px_24px_rgba(0,0,0,0.25),inset_0_2px_4px_rgba(255,255,255,0.7)]
                      group-hover/discover:scale-110 transition-all duration-300 ease-out
                      relative overflow-hidden
                      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-transparent before:opacity-60`}
                                  >
                                    {option.icon}
                                  </div>

                                  <div className="text-sm font-semibold text-gray-800 group-hover/discover:text-blue-600 transition-colors duration-300 mb-1">
                                    {option.name}
                                  </div>

                                  <div className="text-xs text-gray-600 font-medium leading-tight">
                                    {option.desc}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Water droplet decorative elements */}
                          <div
                            className="absolute top-6 right-6 w-14 h-10 bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-purple-500/10 rounded-full blur-md transform rotate-12
            shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]"
                          ></div>
                          <div
                            className="absolute bottom-6 left-6 w-10 h-14 bg-gradient-to-br from-purple-400/20 via-indigo-300/15 to-blue-500/10 rounded-full blur-sm transform -rotate-12
            shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]"
                          ></div>
                          <div
                            className="absolute top-1/2 left-1/2 w-6 h-6 bg-gradient-to-br from-cyan-400/15 via-blue-300/10 to-purple-500/8 rounded-full blur-sm transform translate-x-8
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)]"
                          ></div>

                          {/* Floating water bubbles */}
                          <div className="absolute top-10 right-16 w-2.5 h-2.5 bg-white/40 rounded-full blur-[1px] animate-pulse"></div>
                          <div className="absolute bottom-12 left-16 w-2 h-2 bg-white/30 rounded-full blur-[1px] animate-pulse delay-500"></div>
                          <div className="absolute top-16 left-1/3 w-1.5 h-1.5 bg-white/35 rounded-full blur-[0.5px] animate-pulse delay-1000"></div>
                        </div>

                        {/* Enhanced water droplet glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-cyan-300/6 to-purple-500/8 rounded-[2rem] blur-2xl -z-10"></div>
                        <div className="absolute inset-2 bg-gradient-to-tr from-white/20 via-transparent to-white/10 rounded-[1.5rem] blur-xl -z-10"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="hidden lg:flex items-center">
                <button
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/8 ${
                    isScrolled
                      ? "text-blue-500 hover:text-blue-700"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  <span className="font-extrabold">Need Counselling?</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-full transition-all duration-300 hover:bg-white/8 ${
                    isScrolled ? "text-gray-700" : "text-white/90"
                  }`}
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden px-4 pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                    searchFocused ? "text-blue-500 scale-110" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search colleges, exams..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/30 backdrop-blur-xl rounded-full border border-white/20 
          focus:outline-none focus:ring-1 focus:ring-blue-400/30 placeholder:text-xs placeholder-gray-500 transition-all duration-500 
          shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(255,255,255,0.2)] 
          focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] focus:scale-[1.02]"
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="absolute top-20 left-4 right-4 bg-white/90 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/30 p-5 animate-in slide-in-from-top-5 duration-300">
            <div className="space-y-6">
              {/* Mobile Explore */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  Explore Programs
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {exploreOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all duration-300"
                    >
                      <div
                        className={`w-6 h-6 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center text-white text-xs`}
                      >
                        {option.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {option.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Discover */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                  Discover
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {discoverOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 hover:bg-emerald-50 rounded-lg cursor-pointer transition-all duration-300"
                    >
                      <div
                        className={`w-6 h-6 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center text-white text-xs`}
                      >
                        {option.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {option.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-500 hover:scale-105">
                Need Counselling?
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
};

export default Navbar;
