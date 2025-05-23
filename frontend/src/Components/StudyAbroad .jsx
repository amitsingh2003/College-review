import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Award, DollarSign, GraduationCap, MapPin, TrendingUp, ChevronRight } from 'lucide-react';

const StudyAbroad = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const countries = [
    {
      name: 'United States',
      flag: '🇺🇸',
      colleges: 236,
      exams: '35+',
      scholarships: '35+',
      avgLivingCost: '$19.2k/yr',
      courses: '14+',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      rank: '#1',
      popular: true,
      description: 'World-class universities and diverse programs'
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      colleges: 66,
      exams: '40+',
      scholarships: '40+',
      avgLivingCost: '$24.5k/yr',
      courses: '14+',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
      rank: '#2',
      popular: true,
      description: 'Historic excellence and global recognition'
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      colleges: 103,
      exams: '30+',
      scholarships: '30+',
      avgLivingCost: '$18.7k/yr',
      courses: '20+',
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop',
      rank: '#3',
      popular: true,
      description: 'Multicultural environment and quality education'
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      colleges: 33,
      exams: '50+',
      scholarships: '50+',
      avgLivingCost: '$22.2k/yr',
      courses: '13+',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      rank: '#4',
      popular: false,
      description: 'Innovation hub with beautiful landscapes'
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      colleges: 42,
      exams: '41+',
      scholarships: '41+',
      avgLivingCost: '$15.7k/yr',
      courses: '11+',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
      rank: '#5',
      popular: false,
      description: 'Engineering excellence and free education'
    },
    {
      name: 'Netherlands',
      flag: '🇳🇱',
      colleges: 24,
      exams: '45+',
      scholarships: '45+',
      avgLivingCost: '$16.8k/yr',
      courses: '8+',
      image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop',
      rank: '#6',
      popular: false,
      description: 'Progressive education and innovation'
    }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
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
      scrollContainer.addEventListener('mouseleave', handleMouseUp);
      return () => {
        scrollContainer.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Header */}
      <div className="pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 tracking-tight">
            Study <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Abroad</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover world-class education opportunities and transform your future with international experience
          </p>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="px-6 pb-16">
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-6"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {countries.map((country, index) => (
            <div 
              key={country.name}
              className="flex-shrink-0 w-80 group"
              style={{ userSelect: 'none' }}
            >
              {/* Neomorphism Card */}
              <div className="relative bg-gray-100 rounded-3xl p-1 shadow-neomorphism hover:shadow-neomorphism-hover transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="bg-white rounded-3xl overflow-hidden h-full">
                  {/* Country Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={country.image} 
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Country Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{country.flag}</span>
                          <div>
                            <h3 className="text-xl font-bold">{country.name}</h3>
                            <p className="text-sm opacity-90">{country.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                            {country.rank}
                          </div>
                          {country.popular && (
                            <div className="bg-yellow-400/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold mt-1">
                              Popular
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-2xl p-4 shadow-neomorphism-inset hover:shadow-neomorphism-inset-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Exams</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{country.exams}</p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 shadow-neomorphism-inset hover:shadow-neomorphism-inset-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Award className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Scholarships</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{country.scholarships}</p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 shadow-neomorphism-inset hover:shadow-neomorphism-inset-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Living Cost</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{country.avgLivingCost}</p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 shadow-neomorphism-inset hover:shadow-neomorphism-inset-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Courses</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{country.courses}</p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl shadow-neomorphism-inset hover:shadow-neomorphism-inset-hover transition-all duration-300 group/btn">
                        <span className="font-medium text-gray-700 group-hover/btn:text-blue-600 transition-colors">
                          {country.colleges} Universities
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-600 group-hover/btn:translate-x-1 transition-all" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn">
                        <span className="font-medium">Explore Programs</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .shadow-neomorphism {
          box-shadow: 
            20px 20px 40px rgba(0, 0, 0, 0.1),
            -20px -20px 40px rgba(255, 255, 255, 0.8);
        }
        
        .shadow-neomorphism-hover {
          box-shadow: 
            25px 25px 50px rgba(0, 0, 0, 0.15),
            -25px -25px 50px rgba(255, 255, 255, 0.9);
        }
        
        .shadow-neomorphism-inset {
          box-shadow: 
            inset 8px 8px 16px rgba(0, 0, 0, 0.1),
            inset -8px -8px 16px rgba(255, 255, 255, 0.8);
        }
        
        .shadow-neomorphism-inset-hover {
          box-shadow: 
            inset 12px 12px 24px rgba(0, 0, 0, 0.15),
            inset -12px -12px 24px rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
};

export default StudyAbroad;