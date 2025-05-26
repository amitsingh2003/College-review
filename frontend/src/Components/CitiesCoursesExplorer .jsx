import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  GraduationCap,
  Users,
  Building,
  Star,
  TrendingUp,
  Heart,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const EnhancedEducationalExplorer = () => {
  const [activeCourseType, setActiveCourseType] = useState("Bachelor");
  const citiesScrollRef = useRef(null);
  const coursesScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState({
    cities: false,
    courses: false,
  });
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cities = [
    {
      name: "Bangalore",
      subtitle: "Silicon Valley of India",
      colleges: "500+",
      rating: 4.8,
      popular: true,
      rank: "#1",
      imageUrl:
        "https://i.pinimg.com/736x/09/ca/88/09ca881b5d86fa27a24c9bc3558706f0.jpg",
      description: "Tech hub with world-class institutions",
    },
    {
      name: "Lucknow",
      subtitle: "City of Nawabs",
      colleges: "320+",
      rating: 4.6,
      popular: true,
      rank: "#2",
      imageUrl:
        "https://i.pinimg.com/736x/56/7a/75/567a7525c99771d33fc9deb3cb2f1baf.jpg",
      description: "Rich cultural heritage & education",
    },
    {
      name: "Ahmedabad",
      subtitle: "Manchester of East",
      colleges: "280+",
      rating: 4.5,
      popular: false,
      rank: "#3",
      imageUrl:
        "https://i.pinimg.com/736x/85/b7/97/85b797117c2060e63f0735a740900e77.jpg",
      description: "Business & engineering excellence",
    },
    {
      name: "Gurgaon",
      subtitle: "Millennium City",
      colleges: "250+",
      rating: 4.7,
      popular: true,
      rank: "#4",
      imageUrl:
        "https://i.pinimg.com/736x/80/c3/fe/80c3fee03082a4180bcb7d46f69b5eee.jpg",
      description: "Modern corporate education hub",
    },
    {
      name: "Bhopal",
      subtitle: "City of Lakes",
      colleges: "180+",
      rating: 4.4,
      popular: false,
      rank: "#5",
      imageUrl:
        "https://i.pinimg.com/736x/5e/27/f3/5e27f3486ab906c7c9d406711f80f7e0.jpg",
      description: "Peaceful learning environment",
    },
    {
      name: "Pune",
      subtitle: "Oxford of the East",
      colleges: "450+",
      rating: 4.8,
      popular: true,
      rank: "#6",
      imageUrl:
        "https://i.pinimg.com/736x/62/9f/4d/629f4d660dab55451932e55fdd768971.jpg",
      description: "Premier educational destination",
    },
    {
      name: "Jaipur",
      subtitle: "Pink City",
      colleges: "220+",
      rating: 4.5,
      popular: false,
      rank: "#7",
      imageUrl:
        "https://i.pinimg.com/736x/80/7e/c3/807ec32e3de48bb3b61e79e6f12e6c30.jpg",
      description: "Royal heritage meets modern education",
    },
    {
      name: "Delhi",
      subtitle: "Capital Territory",
      colleges: "600+",
      rating: 4.9,
      popular: true,
      rank: "#8",
      imageUrl:
        "https://i.pinimg.com/736x/2e/50/4f/2e504f15504dd8ae85928bd66b3a97c4.jpg",
      description: "India's educational powerhouse",
    },
  ];

  // Touch/Mouse handlers for horizontal scrolling
  const handleStart = (e, section) => {
    const x = e.type === "mousedown" ? e.pageX : e.touches[0].clientX;
    const ref = section === "cities" ? citiesScrollRef : coursesScrollRef;

    setIsDragging((prev) => ({ ...prev, [section]: true }));
    setStartX(x - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMove = (e, section) => {
    if (!isDragging[section]) return;
    e.preventDefault();

    const x = e.type === "mousemove" ? e.pageX : e.touches[0].clientX;
    const ref = section === "cities" ? citiesScrollRef : coursesScrollRef;
    const walk = (x - ref.current.offsetLeft - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleEnd = (section) => {
    setIsDragging((prev) => ({ ...prev, [section]: false }));
  };

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.cities && citiesScrollRef.current) {
        const maxScroll =
          citiesScrollRef.current.scrollWidth -
          citiesScrollRef.current.clientWidth;
        const currentScroll = citiesScrollRef.current.scrollLeft;

        if (currentScroll >= maxScroll) {
          citiesScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          citiesScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isDragging.cities]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.courses && coursesScrollRef.current) {
        const maxScroll =
          coursesScrollRef.current.scrollWidth -
          coursesScrollRef.current.clientWidth;
        const currentScroll = coursesScrollRef.current.scrollLeft;

        if (currentScroll >= maxScroll) {
          coursesScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          coursesScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isDragging.courses, activeCourseType]);

  const NeumorphicCard = ({
    children,
    className = "",
    hover = true,
    size = "default",
  }) => {
    const sizeClasses = {
      small: "rounded-2xl shadow-[8px_8px_16px_#b8b9be,-8px_-8px_16px_#ffffff]",
      default:
        "rounded-3xl shadow-[12px_12px_24px_#b8b9be,-12px_-12px_24px_#ffffff]",
      large:
        "rounded-4xl shadow-[16px_16px_32px_#b8b9be,-16px_-16px_32px_#ffffff]",
    };

    return (
      <div
        className={`
        bg-gradient-to-br from-gray-50 to-gray-100 ${sizeClasses[size]}
        ${
          hover
            ? "hover:shadow-[16px_16px_32px_#b3b4b9,-16px_-16px_32px_#ffffff] hover:scale-[1.02] hover:-translate-y-1"
            : ""
        }
        transition-all duration-500 ease-out border border-white/60 backdrop-blur-sm
        ${className}
      `}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8 overflow-hidden" style={{
        background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)",
      }}>
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
        {/* Top Cities Section */}
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div
              className="inline-block bg-gradient-to-br from-[#f7fafd] via-[#f0f4f8] to-[#ffffff] rounded-full px-10 py-5 
    shadow-[inset_-3px_-3px_7px_rgba(255,255,255,0.9),inset_4px_4px_7px_rgba(0,0,0,0.12),14px_14px_30px_rgba(0,0,0,0.25),-6px_-6px_25px_rgba(255,255,255,0.9)] 
    border-[1.5px] border-white/50 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:scale-105"
            >
              {/* Highlight Glare Effects */}
              <div className="absolute top-1.5 left-4 w-7 h-3 bg-white/50 rounded-full blur-md opacity-80 rotate-[15deg]"></div>
              <div className="absolute top-1 right-5 w-3.5 h-2 bg-white/70 rounded-full blur-sm opacity-60 rotate-[20deg]"></div>

              {/* Title */}
              <h2 className="text-xl lg:text-2xl font-bold relative z-10">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)]">
                  Top Cities to Study
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base lg:text-lg xl:text-xl leading-relaxed">
              Explore premier educational destinations across India
            </p>
          </div>

          <div className="relative group">
            <div
              ref={citiesScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseDown={(e) => handleStart(e, "cities")}
              onMouseMove={(e) => handleMove(e, "cities")}
              onMouseUp={() => handleEnd("cities")}
              onMouseLeave={() => handleEnd("cities")}
              onTouchStart={(e) => handleStart(e, "cities")}
              onTouchMove={(e) => handleMove(e, "cities")}
              onTouchEnd={() => handleEnd("cities")}
            >
              {cities.map((city, index) => (
                <NeumorphicCard
                  key={city.name}
                  className="flex-shrink-0 w-72 lg:w-80 overflow-hidden group/card select-none"
                >
                  <div className="relative h-48 lg:h-52 overflow-hidden">
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    <div className="absolute top-4 left-4">
                      <div className="bg-white/25 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
                        <span className="text-white font-bold text-sm">
                          {city.rank}
                        </span>
                      </div>
                    </div>

                    {city.popular && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-orange-500/90 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1">
                          <Heart className="w-3 h-3 text-white fill-current" />
                          <span className="text-white font-medium text-xs">
                            Popular
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold text-sm">
                          {city.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover/card:text-blue-600 transition-colors duration-300">
                        {city.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {city.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {city.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building className="w-4 h-4" />
                        <span className="font-semibold">{city.colleges}</span>
                        <span className="text-sm">Colleges</span>
                      </div>
                      <NeumorphicCard
                        size="small"
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50"
                      >
                        <span className="text-blue-600 font-medium text-sm">
                          Explore
                        </span>
                      </NeumorphicCard>
                    </div>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default EnhancedEducationalExplorer;
