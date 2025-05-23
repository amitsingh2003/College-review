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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);
  const [discoverDropdown, setDiscoverDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

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
      name: "IIT Mumbai",
      location: "Bangalore",
      rating: "9.2",
      fees: "₹2.5L",
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
      rating: "9.3",
      fees: "₹2.7L",
    },
    {
      name: "IIT Kanpur",
      location: "Kanpur",
      rating: "9.1",
      fees: "₹2.4L",
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
                ? "bg-white/15 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.12)] border border-white/20"
                : "bg-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] border-transparent"
            }`}
        >
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between h-12 lg:h-14">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0 group">
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-lg lg:text-xl font-bold transition-all duration-500 ${
                      isScrolled ? "text-gray-800" : "text-white"
                    }`}
                  >
                    SCS GLOBAL
                  </span>
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
                    className={`flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/8 ${
                      isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span>Explore Programs</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-all duration-300 ${
                        exploreDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {exploreDropdown && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-screen max-w-4xl">
                      <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 p-6 animate-in slide-in-from-top-5 duration-300">
                        <div className="grid grid-cols-8 gap-6">
                          {/* Categories */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                              <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                                Programs
                              </h3>
                            </div>
                            <div className="space-y-1">
                              {exploreOptions.map((option, index) => (
                                <div
                                  key={index}
                                  className="group/item flex items-center space-x-2 p-2.5 hover:bg-blue-50 rounded-lg cursor-pointer transition-all duration-300"
                                >
                                  <div
                                    className={`w-6 h-6 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center text-white shadow-md`}
                                  >
                                    {option.icon}
                                  </div>
                                  <span className="text-xs font-medium text-gray-700 group-hover/item:text-blue-600 transition-colors">
                                    {option.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Colleges */}
                          <div className="col-span-3">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                              <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                                Top Colleges
                              </h3>
                            </div>
                            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                              {collegesData.map((college, index) => (
                                <div
                                  key={index}
                                  className="group/college p-2.5 hover:bg-emerald-50 rounded-lg cursor-pointer transition-all duration-300"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="text-xs font-semibold text-gray-800 group-hover/college:text-emerald-600 transition-colors truncate">
                                        {college.name}
                                      </div>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                          <MapPin className="w-2.5 h-2.5" />
                                          {college.location}
                                        </span>
                                        <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                                          ⭐ {college.rating}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-xs font-bold text-gray-600">
                                      {college.fees}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* States */}
                          <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                              <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                                By State
                              </h3>
                            </div>
                            <div className="space-y-1">
                              {statesData.map((state, index) => (
                                <div
                                  key={index}
                                  className="group/state p-2.5 hover:bg-purple-50 rounded-lg cursor-pointer transition-all duration-300"
                                >
                                  <span className="text-xs font-medium text-gray-700 group-hover/state:text-purple-600 transition-colors">
                                    {state.name}
                                  </span>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {state.colleges} colleges
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Exams */}
                          <div className="col-span-1">
                            <div className="flex items-center gap-1 mb-4">
                              <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                              <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                                Exams
                              </h3>
                            </div>
                            <div className="space-y-1">
                              {examsData.map((exam, index) => (
                                <div
                                  key={index}
                                  className="group/exam p-2 hover:bg-amber-50 rounded-lg cursor-pointer transition-all duration-300"
                                >
                                  <div className="text-xs font-semibold text-gray-800 group-hover/exam:text-amber-600 transition-colors">
                                    {exam.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {exam.date}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Bar - Only neomorphism element inside navbar */}
                <div className="flex-1 max-w-sm">
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
                </div>

                {/* Discover Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setDiscoverDropdown(true)}
                  onMouseLeave={() => setDiscoverDropdown(false)}
                >
                  <button
                    className={`flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/8 ${
                      isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    <span>Discover</span>
                  </button>

                  {discoverDropdown && (
                    <div className="absolute top-full right-0 mt-3 w-80">
                      <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 p-5 animate-in slide-in-from-top-5 duration-300">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                          <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                            Discover More
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {discoverOptions.map((option, index) => (
                            <div
                              key={index}
                              className="group/discover p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-all duration-300"
                            >
                              <div
                                className={`w-8 h-8 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center text-white shadow-lg mb-2 group-hover/discover:scale-110 transition-transform duration-300`}
                              >
                                {option.icon}
                              </div>
                              <div className="text-sm font-semibold text-gray-800 group-hover/discover:text-blue-600 transition-colors">
                                {option.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {option.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <div className="hidden lg:flex items-center">
                <button
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/8 ${
                    isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
                  }`}
                >
                  Need Counselling?
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
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                  searchFocused ? "text-blue-500 scale-110" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search colleges, exams..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/30 backdrop-blur-xl rounded-full border border-white/20 
                  focus:outline-none focus:ring-1 focus:ring-blue-400/30 placeholder:text-xs placeholder-gray-500 transition-all duration-500 
                  shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(255,255,255,0.2)] 
                  focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] focus:scale-[1.02]"
              />
            </div>
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