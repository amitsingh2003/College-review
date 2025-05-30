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
  Star,
  TrendingUp,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";

const CollegeDetails = () => {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [collegeData, setCollegeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const EXCLUDED_FIELDS = [
    "level",
    "subsections",
    "subsectionslevel",
    "metadata",
    "extraction_timestamp",
    "source_type",
    "parser_info",
    "wiki_metadata",
    "section_level",
    "section_type",
    "toc_level",
    "heading_level",
    "Gallery",
  ];

  const shouldExcludeField = (key, value) => {
    const lowerKey = key.toLowerCase();

    // Exclude known metadata fields
    if (EXCLUDED_FIELDS.includes(lowerKey)) return true;

    // Exclude fields that are just numbers and likely metadata
    if (
      typeof value === "number" &&
      (lowerKey.includes("level") || lowerKey.includes("section"))
    )
      return true;

    // Exclude empty arrays or objects that only contain metadata
    if (Array.isArray(value) && value.length === 0) return true;
    if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    )
      return true;

    return false;
  };

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

    return text
      .replace(/\[citation needed\]/g, "")
      .replace(/\[\d+\]/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove markdown bold formatting
      .replace(/\*(.*?)\*/g, "$1") // Remove markdown italic formatting
      .replace(/__(.*?)__/g, "$1") // Remove markdown underline formatting
      .replace(/~~(.*?)~~/g, "$1") // Remove markdown strikethrough formatting
      .replace(/#{1,6}\s*/g, "") // Remove markdown headers
      .replace(/\.mw-parser-output[^}]*}/g, "")
      .replace(/\.mw-parser-output[^{]*{[^}]*}/g, "")
      .replace(/\d+°\d+′\d+″[NS]\s+\d+°\d+′\d+″[EW][^\/]*\/[^\/]*\/[^\s]*/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const parseLocation = (locationText) => {
    if (!locationText) return "Location not available";

    const cleanLocation = locationText
      .split(/\d+°/)[0]
      .replace(/\.mw-parser-output[^}]*}/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return cleanLocation.replace(/[,.\s]+$/, "") || "Location not available";
  };

  const hasData = (data) => {
    if (!data) return false;

    if (typeof data === "string") {
      const cleaned = cleanText(data);
      return cleaned.length > 0 && cleaned !== "Information not available";
    }

    if (Array.isArray(data)) {
      return data.some((item) => hasData(item));
    }

    if (typeof data === "object") {
      // For objects, check if any non-metadata fields have data
      return Object.entries(data).some(([key, value]) => {
        if (shouldExcludeField(key, value)) return false;
        return hasData(value);
      });
    }

    return true;
  };

  const renderValue = (value) => {
    if (!value) return "Information not available";

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        const filteredArray = value
          .filter((item) => item && item.toString().trim().length > 0)
          .map((item) => cleanText(item.toString()))
          .filter((item) => item && item !== "Information not available");

        return filteredArray.length > 0
          ? filteredArray.join(", ")
          : "Information not available";
      }

      // Handle nested objects - filter out metadata fields
      const filteredEntries = Object.entries(value).filter(([key, val]) => {
        // Use the enhanced exclusion check
        if (shouldExcludeField(key, val)) return false;
        // Exclude empty values
        if (
          !val ||
          (typeof val === "string" && val.toString().trim().length === 0)
        )
          return false;
        return true;
      });

      if (filteredEntries.length === 0) return "Information not available";

      const renderedEntries = filteredEntries
        .map(([key, val]) => {
          const cleanKey = cleanText(key.replace(/_/g, " "));
          const cleanVal = renderValue(val); // Recursive call to handle nested objects

          // Don't include entries where the value is "Information not available"
          if (cleanVal === "Information not available") return null;

          return `${cleanKey}: ${cleanVal}`;
        })
        .filter((entry) => entry !== null);

      return renderedEntries.length > 0
        ? renderedEntries.join("; ")
        : "Information not available";
    }

    return cleanText(value.toString());
  };

  const filterSections = (sections) => {
    if (!sections) return {};

    const filteredSections = {};
    Object.entries(sections).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();

      // More comprehensive filtering
      if (
        !lowerKey.includes("reference") &&
        !lowerKey.includes("external") &&
        !lowerKey.includes("links") &&
        !lowerKey.includes("citation") &&
        !lowerKey.includes("footnote") &&
        !lowerKey.includes("see also") &&
        !lowerKey.includes("bibliography") &&
        !shouldExcludeField(key, value) &&
        hasData(value)
      ) {
        // Clean the section data before adding it
        const cleanedValue = cleanSectionData(value);
        if (hasData(cleanedValue)) {
          filteredSections[key] = cleanedValue;
        }
      }
    });
    return filteredSections;
  };

  const cleanSectionData = (data) => {
    if (!data) return data;

    if (typeof data === "string") {
      return cleanText(data);
    }

    if (Array.isArray(data)) {
      return data
        .map((item) => cleanSectionData(item))
        .filter((item) => item && item !== "Information not available");
    }

    if (typeof data === "object") {
      const cleaned = {};
      Object.entries(data).forEach(([key, value]) => {
        if (!shouldExcludeField(key, value)) {
          const cleanedValue = cleanSectionData(value);
          if (cleanedValue && cleanedValue !== "Information not available") {
            cleaned[key] = cleanedValue;
          }
        }
      });
      return Object.keys(cleaned).length > 0 ? cleaned : null;
    }

    return data;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-500 mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Loading College Data
          </h3>
          <p className="text-gray-600 text-base">Fetching information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 max-w-lg w-full text-center">
          <div className="bg-red-50 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Info className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Unable to Load Data
          </h2>
          <p className="text-red-600 mb-6 text-base">{error}</p>
          <button
            onClick={handleBackClick}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center mx-auto font-semibold text-base"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <p className="text-gray-600 mb-6 text-base">
            No college data available
          </p>
          <button
            onClick={handleBackClick}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center mx-auto font-semibold text-base"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const filteredSections = filterSections(collegeData.sections);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
    {/* Header */}
<div className="bg-white/60 backdrop-blur-xl shadow-md border-b border-white/20 sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
    <div className="flex items-center justify-between">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="group flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 backdrop-blur-lg rounded-lg transition-all duration-300 shadow-sm hover:shadow-md font-medium border border-white/30"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        Back
      </button>

      {/* Brand Logo and Name */}
      <div className="flex items-center space-x-3 text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
        <img
          src="/src/assets/logo.png"
          alt="SCS GLOBALS Logo"
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain bg-transparent"
        />
        <span className="font-semibold text-sm sm:text-base tracking-wide">SCS GLOBALS</span>
      </div>
    </div>
  </div>
</div>


      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                {collegeData.images && collegeData.images.length > 0 ? (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-white to-blue-50 flex items-center justify-center border-2 border-white/60 p-1">
                    <img
                      src={collegeData.images[0]}
                      alt={`${collegeData.title} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.parentElement.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md border-2 border-white/60">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              {/* College Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-blue-800 bg-clip-text text-transparent mb-5 leading-tight">
                  {collegeData.title}
                </h1>
                <p className="text-gray-600 leading-relaxed mb-5 text-base line-clamp-3">
                  {cleanText(collegeData.description)}
                </p>

                {/* Quick Info Cards */}
                <div className="flex flex-wrap gap-3">
                  {collegeData.basic_info?.established && (
                    <div className="flex items-center bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 shadow-md border border-white/40">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-lg mr-3">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        Est. {collegeData.basic_info.established}
                      </span>
                    </div>
                  )}

                  {collegeData.basic_info?.type && (
                    <div className="flex items-center bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 shadow-md border border-white/40">
                      <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-2 rounded-lg mr-3">
                        <Building className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {collegeData.basic_info.type}
                      </span>
                    </div>
                  )}

                  {collegeData.basic_info?.location && (
                    <div className="flex items-center bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 shadow-md border border-white/40">
                      <div className="bg-gradient-to-br from-red-100 to-red-200 p-2 rounded-lg mr-3">
                        <MapPin className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {
                          parseLocation(collegeData.basic_info.location).split(
                            ","
                          )[0]
                        }
                      </span>
                    </div>
                  )}

                  {collegeData.basic_info?.website && (
                    <a
                      href={collegeData.basic_info.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl px-4 py-3 shadow-md transition-all duration-300 font-semibold"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="text-sm">Website</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Motto */}
            {collegeData.basic_info?.motto && (
              <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                <p className="text-blue-700 font-semibold italic text-base">
                  "{collegeData.basic_info.motto}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Academic Information */}
          {hasData(collegeData.academic_info) && (
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center mb-5">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl mr-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Academic Info
                  </h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(collegeData.academic_info)
                    .filter(([key, value]) => hasData(value))
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                      >
                        <div className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="text-sm text-gray-700 font-medium leading-relaxed">
                          {renderValue(value).substring(0, 100) +
                            (renderValue(value).length > 100 ? "..." : "")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Financial Information */}
          {hasData(collegeData.financial_info) && (
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center mb-5">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl mr-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Financial Info
                  </h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(collegeData.financial_info)
                    .filter(([key, value]) => hasData(value))
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                      >
                        <div className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="text-sm text-gray-700 font-medium leading-relaxed">
                          {renderValue(value).substring(0, 100) +
                            (renderValue(value).length > 100 ? "..." : "")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Campus Information */}
          {hasData(collegeData.campus_info) && (
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center mb-5">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl mr-4">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Campus Info
                  </h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(collegeData.campus_info)
                    .filter(([key, value]) => hasData(value))
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                      >
                        <div className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2">
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="text-sm text-gray-700 font-medium leading-relaxed">
                          {renderValue(value).substring(0, 100) +
                            (renderValue(value).length > 100 ? "..." : "")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Location Details */}
        {(collegeData.coordinates || collegeData.basic_info?.location) && (
          <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden mb-8">
            <div className="p-5">
              <div className="flex items-center mb-5">
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl mr-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Location Details
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {collegeData.basic_info?.location && (
                  <div>
                    <div className="text-sm font-bold text-red-600 uppercase tracking-wide mb-2">
                      Address
                    </div>
                    <div className="text-base text-gray-800 font-semibold leading-relaxed">
                      {parseLocation(collegeData.basic_info.location)}
                    </div>
                  </div>
                )}

                {collegeData.coordinates && (
                  <div>
                    <div className="text-sm font-bold text-red-600 uppercase tracking-wide mb-2">
                      Coordinates
                    </div>
                    <div className="text-base text-gray-700 font-semibold">
                      {collegeData.coordinates.latitude}°,{" "}
                      {collegeData.coordinates.longitude}°
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {Object.keys(filteredSections).length > 0 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden mb-8">
            <div className="p-5">
              <div className="flex items-center mb-5">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-xl mr-4">
                  <Info className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Additional Information
                </h3>
              </div>

              <div className="space-y-3">
                {Object.entries(filteredSections)
                  .slice(0, 6)
                  .map(([sectionName, sectionData]) => {
                    // Clean the section data before rendering
                    const cleanedData = cleanSectionData(sectionData);
                    if (!hasData(cleanedData)) return null;

                    return (
                      <div
                        key={sectionName}
                        className="border border-gray-100 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(sectionName)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50/50 transition-all duration-300"
                        >
                          <span className="text-blue-500 font-semibold capitalize text-base">
                            {cleanText(sectionName.replace(/_/g, " "))}
                          </span>
                          <div className="bg-white/80 shadow-sm p-2 rounded-lg">
                            {expandedSections[sectionName] ? (
                              <ChevronUp className="w-5 h-5 text-gray-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                        </button>

                        {expandedSections[sectionName] && (
                          <div className="px-4 pb-4 border-t border-gray-100 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
                            <div className="pt-4">
                              <div className="text-gray-700 leading-relaxed text-base">
                                {typeof cleanedData === "object" &&
                                !Array.isArray(cleanedData) ? (
                                  Object.entries(cleanedData)
                                    .filter(
                                      ([key, value]) =>
                                        !shouldExcludeField(key, value) &&
                                        hasData(value)
                                    )
                                    .map(([key, value]) => {
                                      const renderedValue = renderValue(value);
                                      if (
                                        renderedValue ===
                                        "Information not available"
                                      )
                                        return null;

                                      return (
                                        <div
                                          key={key}
                                          className="mb-3 last:mb-0"
                                        >
                                          <div className="text-gray-800 leading-relaxed text-sm">
                                            {renderedValue}
                                          </div>
                                        </div>
                                      );
                                    })
                                    .filter((item) => item !== null)
                                ) : (
                                  <div className="text-sm">
                                    {renderValue(cleanedData)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                  .filter((item) => item !== null)}
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        {(collegeData.rankings ||
          collegeData.student_info ||
          collegeData.faculty_info) && (
          <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 rounded-xl mr-4">
                  <TrendingUp className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Statistics & Rankings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collegeData.rankings && hasData(collegeData.rankings) && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border border-yellow-200">
                    <div className="flex items-center mb-4">
                      <Award className="w-6 h-6 text-yellow-600 mr-3" />
                      <h4 className="text-lg font-bold text-gray-800">
                        Rankings
                      </h4>
                    </div>
                    <div className="text-base text-gray-700 leading-relaxed">
                      {renderValue(collegeData.rankings).substring(0, 150) +
                        (renderValue(collegeData.rankings).length > 150
                          ? "..."
                          : "")}
                    </div>
                  </div>
                )}

                {collegeData.student_info &&
                  hasData(collegeData.student_info) && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-blue-600 mr-3" />
                        <h4 className="text-lg font-bold text-gray-800">
                          Student Info
                        </h4>
                      </div>
                      <div className="text-base text-gray-700 leading-relaxed">
                        {renderValue(collegeData.student_info).substring(
                          0,
                          150
                        ) +
                          (renderValue(collegeData.student_info).length > 150
                            ? "..."
                            : "")}
                      </div>
                    </div>
                  )}

                {collegeData.faculty_info &&
                  hasData(collegeData.faculty_info) && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                      <div className="flex items-center mb-4">
                        <GraduationCap className="w-6 h-6 text-purple-600 mr-3" />
                        <h4 className="text-lg font-bold text-gray-800">
                          Faculty Info
                        </h4>
                      </div>
                      <div className="text-base text-gray-700 leading-relaxed">
                        {renderValue(collegeData.faculty_info).substring(
                          0,
                          150
                        ) +
                          (renderValue(collegeData.faculty_info).length > 150
                            ? "..."
                            : "")}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        {(collegeData.contact_info ||
          collegeData.basic_info?.phone ||
          collegeData.basic_info?.email) && (
          <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/40 overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-xl mr-4">
                  <Phone className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collegeData.basic_info?.phone && (
                  <div className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                    <Phone className="w-6 h-6 text-teal-600 mr-4" />
                    <div>
                      <div className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-1">
                        Phone
                      </div>
                      <div className="text-base text-gray-800 font-semibold">
                        {cleanText(collegeData.basic_info.phone)}
                      </div>
                    </div>
                  </div>
                )}

                {collegeData.basic_info?.email && (
                  <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <Mail className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <div className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-1">
                        Email
                      </div>
                      <div className="text-base text-gray-800 font-semibold">
                        {cleanText(collegeData.basic_info.email)}
                      </div>
                    </div>
                  </div>
                )}

                {collegeData.contact_info &&
                  hasData(collegeData.contact_info) && (
                    <div className="md:col-span-2">
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
                          Additional Contact Info
                        </div>
                        <div className="text-base text-gray-700 leading-relaxed">
                          {renderValue(collegeData.contact_info)}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeDetails;
