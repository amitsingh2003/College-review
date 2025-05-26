import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Bell,
  Clock,
  TrendingUp,
} from "lucide-react";

const Notifications = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "KCET 2025 Results Date Release",
      subtitle: "KEA to announce Karnataka CET results soon",
      date: "May 20, 2025",
      time: "2 hours ago",
      category: "Results",
      priority: "high",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400",
    },
    {
      id: 2,
      title: "SSC GD Constable 2025 Results",
      subtitle: "Staff Selection Commission latest update",
      date: "May 20, 2025",
      time: "4 hours ago",
      category: "SSC",
      priority: "medium",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    },
    {
      id: 3,
      title: "JAC Result 2025 Update",
      subtitle: "Jharkhand 10th, 12th results expected",
      date: "May 19, 2025",
      time: "6 hours ago",
      category: "Board",
      priority: "high",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400",
    },
    {
      id: 4,
      title: "JEE Main 2025 Session 2",
      subtitle: "Registration deadline extended",
      date: "May 18, 2025",
      time: "8 hours ago",
      category: "JEE",
      priority: "high",
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400",
    },
    {
      id: 5,
      title: "NEET 2025 Admit Card",
      subtitle: "NTA to release hall tickets soon",
      date: "May 17, 2025",
      time: "12 hours ago",
      category: "NEET",
      priority: "medium",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400",
    },
    {
      id: 6,
      title: "CBSE Board Results 2025",
      subtitle: "Class 12th results announcement",
      date: "May 16, 2025",
      time: "1 day ago",
      category: "CBSE",
      priority: "medium",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400",
    },
  ];

  // Duplicate notifications for seamless infinite scroll
  const extendedNotifications = [
    ...notifications,
    ...notifications,
    ...notifications,
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered && !isPaused) {
      const interval = setInterval(() => {
        setScrollPosition((prev) => {
          const cardWidth = 320; // Width + gap
          const maxScroll = notifications.length * cardWidth;
          const newPosition = prev + 1;

          // Reset position for infinite loop
          if (newPosition >= maxScroll) {
            return 0;
          }
          return newPosition;
        });
      }, 30); // Smooth 30ms intervals

      return () => clearInterval(interval);
    }
  }, [isHovered, isPaused, notifications.length]);

  const handleManualScroll = (direction) => {
    setIsPaused(true);
    const cardWidth = 320;
    const scrollAmount = cardWidth;

    setScrollPosition((prev) => {
      if (direction === "next") {
        return prev + scrollAmount;
      } else {
        return Math.max(0, prev - scrollAmount);
      }
    });

    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <section className="relative bg-gray-100 py-16 overflow-hidden"  style={{
        background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)",
      }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #6366f1 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with real-time notifications about exam results,
            admissions, and important deadlines
          </p>
        </div>

        {/* Notifications Slider */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-75 ease-linear"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                width: `${extendedNotifications.length * 320}px`,
              }}
            >
              {extendedNotifications.map((notification, index) => (
                <div
                  key={`${notification.id}-${index}`}
                  className="flex-shrink-0 w-80 group/card cursor-pointer"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-gray-200 hover:-translate-y-1">
                    {/* Image section */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={notification.image}
                        alt={notification.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {notification.category}
                        </span>
                      </div>

                      {/* Time indicator */}
                      <div className="absolute bottom-4 right-4">
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover/card:text-blue-600 transition-colors line-clamp-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {notification.subtitle}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {notification.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover/card:opacity-100 transition-opacity">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons - only visible on hover */}
          <button
            onClick={() => handleManualScroll("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleManualScroll("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
