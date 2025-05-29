import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Globe,
  BookOpen,
  Building,
  DollarSign,
  ArrowLeft,
  ExternalLink,
  Info,
  Camera,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Users,
  Award,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const CollegeDetails = () => {
  const { collegeName } = useParams(); // Get collegeName from URL
  const navigate = useNavigate(); 
  const [collegeData, setCollegeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

 useEffect(() => {
    if (collegeName) {
      fetchCollegeData(decodeURIComponent(collegeName)); 
    }
  }, [collegeName]);

  const fetchCollegeData = async (name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/college?name=${encodeURIComponent(name)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCollegeData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch college information");
      console.error("Error fetching college data:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const cleanText = (text) => {
    if (!text) return "Information not available";

    return (
      text
        .replace(/\[citation needed\]/g, "")
        .replace(/\[\d+\]/g, "")
        // Remove MediaWiki parser output
        .replace(/\.mw-parser-output[^}]*}/g, "")
        .replace(/\.mw-parser-output[^{]*{[^}]*}/g, "")
        // Remove coordinate data patterns
        .replace(
          /\d+°\d+′\d+″[NS]\s+\d+°\d+′\d+″[EW][^\/]*\/[^\/]*\/[^\s]*/g,
          ""
        )
        // Remove extra whitespace and clean up
        .replace(/\s+/g, " ")
        .trim()
    );
  };

  // Enhanced location parsing function - Add this new function after cleanText
  const parseLocation = (locationText) => {
    if (!locationText) return "Location not available";

    // Extract just the readable location part before coordinates
    const cleanLocation = locationText
      .split(/\d+°/)[0] // Split at first coordinate
      .replace(/\.mw-parser-output[^}]*}/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Remove trailing punctuation
    return cleanLocation.replace(/[,.\s]+$/, "") || "Location not available";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/20 p-12 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-blue-500 mx-auto mb-6 shadow-lg"></div>
          <p className="text-gray-700 font-semibold text-lg mb-2">
            Loading college information
          </p>
          <p className="text-gray-500 text-sm">
            Please wait while we fetch the details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/20 p-12 max-w-md w-full text-center">
          <div className="bg-red-100/80 rounded-full p-4 w-20 h-20 mx-auto mb-6 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
            <Info className="w-12 h-12 text-red-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Unable to load college data
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
          onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-2xl transition-all duration-300 flex items-center mx-auto font-semibold shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.5)] hover:scale-105 transform"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!collegeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/20 p-12 text-center">
          <p className="text-gray-700 mb-6 text-lg">
            No college data available
          </p>
          <button
         onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-2xl transition-all duration-300 flex items-center mx-auto font-semibold shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.5)]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
             onClick={() => navigate('/')}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 bg-white/50 hover:bg-white/80 backdrop-blur rounded-2xl transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-105 transform"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-semibold">Back</span>
            </button>
            <div className="flex items-center bg-white/50 backdrop-blur px-6 py-3 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              <img
                src="/src/assets/logo.png"
                alt="Logo"
                className="w-6 h-6 mr-3"
              />
              <span className="text-gray-700 font-semibold text-lg">
                SCS GLOBALS
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.15)] border border-white/30 overflow-hidden mb-12 hover:shadow-[0_25px_60px_rgba(8,112,184,0.25)] transition-all duration-500">
          <div className="p-10">
            <div className="flex flex-col lg:flex-row lg:items-start gap-10">
              {/* Logo */}
              <div className="flex-shrink-0">
                {collegeData.images && collegeData.images.length > 0 ? (
                  <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.25)] bg-gradient-to-br from-white to-gray-50 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <img
                      src={collegeData.images[0]}
                      alt={`${collegeData.title} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.parentElement.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_12px_28px_rgba(59,130,246,0.4)] hover:shadow-[0_16px_36px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300">
                    <GraduationCap className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>

              {/* College Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
                  {collegeData.title}
                </h1>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  {cleanText(collegeData.description)}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {collegeData.basic_info?.established && (
                    <div className="text-center group">
                      <div className="bg-white/50 backdrop-blur rounded-2xl p-4 mb-3 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 transform">
                        <Calendar className="w-8 h-8 text-blue-500 mx-auto" />
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">
                        Founded
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {collegeData.basic_info.established}
                      </div>
                    </div>
                  )}

                  {collegeData.basic_info?.type && (
                    <div className="text-center group">
                      <div className="bg-white/50 backdrop-blur rounded-2xl p-4 mb-3 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 transform">
                        <Building className="w-8 h-8 text-blue-500 mx-auto" />
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">
                        Type
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {collegeData.basic_info.type}
                      </div>
                    </div>
                  )}

                  {collegeData.basic_info?.location && (
                    <div className="text-center group">
                      <div className="bg-white/50 backdrop-blur rounded-2xl p-4 mb-3 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 transform">
                        <MapPin className="w-8 h-8 text-blue-500 mx-auto" />
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">
                        Location
                      </div>
                      <div className="text-sm font-bold text-gray-800 truncate">
                        {
                          parseLocation(collegeData.basic_info.location).split(
                            ","
                          )[0]
                        }
                      </div>
                    </div>
                  )}

                  {collegeData.basic_info?.website && (
                    <div className="text-center group">
                      <div className="bg-white/50 backdrop-blur rounded-2xl p-4 mb-3 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 transform">
                        <Globe className="w-8 h-8 text-blue-500 mx-auto" />
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">
                        Website
                      </div>
                      <a
                        href={collegeData.basic_info.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center"
                      >
                        Visit <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Motto */}
                {collegeData.basic_info?.motto && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur rounded-3xl border-l-4 border-blue-500 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                    <div className="text-xs text-blue-600 uppercase tracking-wide font-bold mb-2">
                      Motto
                    </div>
                    <div className="text-blue-800 font-semibold text-lg italic">
                      "{collegeData.basic_info.motto}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Academic Information */}
          {collegeData.academic_info && (
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/30 overflow-hidden hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-[1.02] transform">
              <div className="p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <div className="bg-blue-100/80 p-3 rounded-2xl mr-4 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  Academic Information
                </h3>
                <div className="space-y-4">
                  {Object.entries(collegeData.academic_info)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 bg-white/50 backdrop-blur rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300"
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="text-gray-800 leading-relaxed font-medium">
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : cleanText(value.toString())}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Financial Information */}
          {collegeData.financial_info && (
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/30 overflow-hidden hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-[1.02] transform">
              <div className="p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <div className="bg-green-100/80 p-3 rounded-2xl mr-4 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  Financial Information
                </h3>
                <div className="space-y-4">
                  {Object.entries(collegeData.financial_info)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 bg-white/50 backdrop-blur rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300"
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="text-gray-800 leading-relaxed font-medium">
                          {cleanText(value.toString())}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Campus Information */}
          {collegeData.campus_info && (
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/30 overflow-hidden hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-[1.02] transform">
              <div className="p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <div className="bg-purple-100/80 p-3 rounded-2xl mr-4 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  Campus Information
                </h3>
                <div className="space-y-4">
                  {Object.entries(collegeData.campus_info)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 bg-white/50 backdrop-blur rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300"
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="text-gray-800 leading-relaxed font-medium">
                          {cleanText(value.toString())}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Location Card */}
          {(collegeData.coordinates || collegeData.basic_info?.location) && (
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/30 overflow-hidden hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-[1.02] transform">
              <div className="p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <div className="bg-red-100/80 p-3 rounded-2xl mr-4 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  Location Details
                </h3>
                <div className="space-y-4">
                  {/* Address */}
                  {collegeData.basic_info?.location && (
                    <div className="p-4 bg-white/50 backdrop-blur rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">
                        Address
                      </div>
                      <div className="text-gray-800 font-bold text-lg leading-relaxed">
                        {parseLocation(collegeData.basic_info.location)}
                      </div>
                    </div>
                  )}

                  {/* Coordinates */}
                  {collegeData.coordinates && (
                    <>
                      <div className="flex justify-between items-center p-4 bg-white/50 backdrop-blur rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                          Latitude
                        </span>
                        <span className="text-gray-800 font-bold text-lg">
                          {collegeData.coordinates.latitude}°
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white/50 backdrop-blur rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                          Longitude
                        </span>
                        <span className="text-gray-800 font-bold text-lg">
                          {collegeData.coordinates.longitude}°
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information Section */}
        {collegeData.sections &&
          Object.keys(collegeData.sections).length > 0 && (
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/30 overflow-hidden hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)] transition-all duration-500 mb-12">
              <div className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-8 flex items-center">
                  <div className="bg-indigo-100/80 p-3 rounded-2xl mr-4 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
                    <Info className="w-6 h-6 text-indigo-600" />
                  </div>
                  Additional Information
                </h3>

                <div className="space-y-4">
                  {Object.entries(collegeData.sections)
                    .filter(
                      ([key, value]) =>
                        value &&
                        (typeof value === "string"
                          ? value.trim()
                          : value.content?.trim())
                    )
                    .slice(0, 4)
                    .map(([sectionName, sectionData]) => (
                      <div
                        key={sectionName}
                        className="bg-white/50 backdrop-blur border border-white/30 rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleSection(sectionName)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-white/70 transition-all duration-300"
                        >
                          <span className="text-gray-800 font-bold text-lg capitalize">
                            {sectionName.replace(/_/g, " ")}
                          </span>
                          <div className="bg-gray-100/80 p-2 rounded-xl shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
                            {expandedSections[sectionName] ? (
                              <ChevronUp className="w-5 h-5 text-gray-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                        </button>

                        {expandedSections[sectionName] && (
                          <div className="px-6 pb-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 backdrop-blur border-t border-white/20">
                            <div className="text-gray-700 leading-relaxed pt-4 font-medium">
                              {typeof sectionData === "string"
                                ? cleanText(sectionData)
                                : cleanText(
                                    sectionData.content ||
                                      JSON.stringify(sectionData)
                                  )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

        {/* Footer */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/30 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center text-gray-600">
              <div className="bg-blue-100/80 p-2 rounded-xl mr-3 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium">
                Data from Wikipedia • Updated:{" "}
                {collegeData.metadata?.extraction_timestamp
                  ? new Date(
                      collegeData.metadata.extraction_timestamp
                    ).toLocaleDateString()
                  : "Recently"}
              </span>
            </div>
            <a
              href={collegeData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.5)] hover:scale-105 transform"
            >
              View Original Source
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
