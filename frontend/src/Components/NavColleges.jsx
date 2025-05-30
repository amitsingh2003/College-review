import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Award,
  Users,
  BookOpen,
  Building,
  TrendingUp,
  Star,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Trophy,
  Briefcase,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

import collegeData from "../assets/College.json";
import Navbar from "./Navbar";

const NavColleges = () => {
  // Sample data structure based on your JSON
  const sampleCollege = {
    name: "IIT Madras",
    logo: "https://www.iitm.ac.in/sites/default/files/logo_0.png",
    about:
      "Indian Institute of Technology Madras is one of the foremost institutes of national importance in higher technological education, basic and applied research. Founded in 1959 with German collaboration, it is recognized globally for excellence in engineering education and research.",
    established: "1959",
    location: "Chennai, Tamil Nadu",
    ranking: "NIRF 2024: #1 (Overall), #1 (Engineering)",
    website: "https://www.iitm.ac.in/",
    contact: {
      email: "dean@iitm.ac.in",
      phone: "+91-44-2257-4000",
      address:
        "Indian Institute of Technology Madras, Chennai - 600036, Tamil Nadu, India",
    },
    campus_life:
      "Sprawling 617-acre campus with lush greenery, deer park, and modern facilities. Active student community with 100+ clubs and societies. Cultural diversity with students from across India and abroad.",
    facilities: [
      "Central Library with 500,000+ books",
      "Research Park for industry collaboration",
      "Incubation Cell for startups",
      "Swimming pool and sports complex",
      "24x7 medical center",
      "Hostels for 6000+ students",
      "Wi-Fi enabled campus",
      "Advanced laboratories",
      "Auditoriums and seminar halls",
      "Cafeterias and dining halls",
    ],
    notable_alumni: [
      "Raghuram Rajan (Former RBI Governor)",
      "Sunder Pichai (CEO, Alphabet Inc.)",
      "Kris Gopalakrishnan (Co-founder, Infosys)",
      "R. Chidambaram (Nuclear Scientist)",
      "Kiran Mazumdar-Shaw (Founder, Biocon)",
      "Venkatesh Prasad (Cricketer)",
    ],
    courses: {
      undergraduate: [
        "B.Tech in Aerospace Engineering",
        "B.Tech in Biotechnology",
        "B.Tech in Chemical Engineering",
        "B.Tech in Civil Engineering",
        "B.Tech in Computer Science and Engineering",
        "B.Tech in Electrical Engineering",
        "B.Tech in Engineering Physics",
        "B.Tech in Mechanical Engineering",
      ],
      postgraduate: [
        "M.Tech in various specializations",
        "M.S. (Research)",
        "MBA",
        "M.A. in English Studies",
        "M.Sc. in Applied Mathematics",
        "M.Sc. in Chemistry",
        "M.Sc. in Physics",
      ],
      phd: [
        "Ph.D in Engineering disciplines",
        "Ph.D in Sciences",
        "Ph.D in Humanities and Social Sciences",
        "Ph.D in Management Studies",
      ],
    },
    departments: [
      "Aerospace Engineering",
      "Applied Mechanics",
      "Biotechnology",
      "Chemical Engineering",
      "Chemistry",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical Engineering",
    ],
    admission: {
      process:
        "Admission through JEE Advanced for B.Tech, GATE for M.Tech, CAT for MBA, and respective entrance exams for other programs",
      exams_accepted: ["JEE Advanced", "GATE", "CAT", "JAM", "CSIR-NET"],
      eligibility:
        "12th with PCM for B.Tech, Bachelor's degree for PG programs",
    },
    placements: {
      average_package: "₹21.48 LPA",
      highest_package: "₹1.31 Crore",
      top_recruiters: [
        "Microsoft",
        "Google",
        "Amazon",
        "Apple",
        "Goldman Sachs",
        "JP Morgan Chase",
        "Intel",
        "Samsung",
        "Adobe",
        "Qualcomm",
      ],
    },
    research: {
      focus_areas: [
        "Artificial Intelligence and Data Science",
        "Aerospace and Defense",
        "Clean Energy and Environment",
        "Healthcare and Medical Devices",
        "Materials and Manufacturing",
        "Ocean Engineering",
        "Rural Development",
      ],
      centers: [
        "Centre for Innovation",
        "Research Park",
        "Centre for Industrial Consultancy and Sponsored Research",
        "Robert Bosch Centre for Data Science and AI",
      ],
    },
    festivals: {
      technical: "Shaastra - Asia's largest science and technology festival",
      cultural: "Saarang - Premier cultural festival of South India",
      sports: "Inter-IIT Sports Meet participation",
    },
  };

  const location = useLocation();
  const { slug } = useParams();

  // Get college data from navigation state or find by slug as fallback
  const college =
    location.state?.collegeData ||
    collegeData.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
    ) ||
    sampleCollege;

  const NeomorphicCard = ({ children, className = "" }) => (
    <div
      className={`
      relative bg-gradient-to-br from-white/80 via-white/60 to-white/70
      shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.8)]
      rounded-3xl backdrop-blur-md border border-white/20
      transition-all duration-500 ease-in-out
      hover:shadow-[12px_12px_24px_rgba(0,0,0,0.08),-12px_-12px_24px_rgba(255,255,255,0.95)]
      hover:scale-[1.015] overflow-hidden
      ${className}
    `}
    >
      {/* Optional gradient ring overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color = "emerald",
    trend,
    trendValue,
  }) => (
    <NeomorphicCard className="group relative p-6 hover:shadow-[10px_10px_20px_rgba(0,0,0,0.1),-10px_-10px_20px_rgba(255,255,255,0.9)] transition-all duration-500 ease-in-out hover:scale-[1.015] overflow-hidden rounded-2xl">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Icon Container */}
          <div
            className={`relative p-3 rounded-2xl bg-gradient-to-br from-${color}-50 via-${color}-100 to-${color}-50
          shadow-[inset_4px_4px_8px_rgba(0,0,0,0.03),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
          group-hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.05),inset_-6px_-6px_12px_rgba(255,255,255,1)]
          transition-all duration-500`}
          >
            {/* Animated background ring */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${color}-400/10 to-${color}-600/10 
            scale-0 group-hover:scale-105 transition-transform duration-700 ease-out`}
            ></div>

            <Icon
              className={`relative w-6 h-6 text-${color}-600 group-hover:text-${color}-700 
            transform transition-all duration-300 group-hover:scale-105`}
            />
          </div>

          {/* Text Content */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest leading-tight">
              {label}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {value}
              </p>
              {trend && (
                <div
                  className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium
                ${
                  trend === "up"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
                >
                  <span className="text-sm">{trend === "up" ? "↗" : "↘"}</span>
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative bar */}
        <div
          className={`w-0.5 h-12 bg-gradient-to-b from-${color}-400 to-${color}-600 rounded-full
        transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center`}
        ></div>
      </div>
    </NeomorphicCard>
  );

  const SectionTitle = ({ title, icon: Icon }) => (
    <div className="flex items-center space-x-4 mb-6 group transition-all duration-500 ease-in-out">
      {/* Icon Container with neumorphic + gradient styling */}
      <div
        className="relative p-3 rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50
      shadow-[inset_4px_4px_8px_rgba(0,0,0,0.03),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
      group-hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.05),inset_-6px_-6px_12px_rgba(255,255,255,1)]
      transition-all duration-500 ease-in-out"
      >
        {/* Animated background ring on hover */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 
        scale-0 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
        ></div>

        <Icon className="relative w-5 h-5 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
      </div>

      {/* Title text */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight transition-all duration-300 group-hover:text-gray-900">
        {title}
      </h2>
    </div>
  );

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 pt-30 pb-12">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-10 lg:space-y-0 lg:space-x-16">
            {/* Logo Section with beautiful fallback */}
            <div className="flex-shrink-0">
              <NeomorphicCard className="p-6 w-32 h-32 flex items-center justify-center bg-white/90 shadow-lg">
                <div className="relative w-24 h-24">
                  <img
                    src={college.logo}
                    alt={college.name}
                    className="w-full h-full object-contain rounded-xl transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback if logo fails */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl  items-center justify-center hidden">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                </div>
              </NeomorphicCard>
            </div>

            {/* Text Section */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-sm">
                {college.name}
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm sm:text-base font-medium pt-2">
                {/* Location */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full 
    bg-white/10 backdrop-blur-md 
    shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15)] 
    hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] 
    transition-all duration-300 ease-in-out
    text-white/90
  "
                >
                  <MapPin className="w-5 h-5 text-emerald-300 drop-shadow-md" />
                  <span>{college.location}</span>
                </div>

                {/* Established */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full 
    bg-white/10 backdrop-blur-md 
    shadow-[inset_2px_2px_4px_  rgba(255,255,255,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15)] 
    hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] 
    transition-all duration-300 ease-in-out
    text-white/90
  "
                >
                  <Calendar className="w-5 h-5 text-teal-300 drop-shadow-md" />
                  <span>Est. {college.established}</span>
                </div>

                {/* Ranking */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full 
    bg-white/10 backdrop-blur-md 
    shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15)] 
    hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] 
    transition-all duration-300 ease-in-out
    text-white/90
  "
                >
                  <Award className="w-5 h-5 text-yellow-300 drop-shadow-md" />
                  <span>{college.ranking}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Calendar}
            label="Established"
            value={college.established}
            color="blue"
          />
          <StatCard
            icon={TrendingUp}
            label="Average Package"
            value={college.placements?.average_package || "N/A"}
            color="green"
          />
          <StatCard
            icon={Trophy}
            label="Highest Package"
            value={college.placements?.highest_package || "N/A"}
            color="purple"
          />
          <StatCard
            icon={Building}
            label="Departments"
            value={college.departments?.length || "N/A"}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <NeomorphicCard className="p-8">
              <SectionTitle title="About" icon={BookOpen} />
              <p className="text-gray-700 leading-relaxed text-lg">
                {college.about}
              </p>
            </NeomorphicCard>

            {/* Courses Section */}
            <NeomorphicCard className="p-8">
              <SectionTitle title="Courses Offered" icon={GraduationCap} />
              <div className="space-y-6">
                {college.courses &&
                  Object.entries(college.courses).map(([level, courseList]) => (
                    <div key={level}>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                        {level.replace("_", " ")} Programs
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {courseList.map((course, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 rounded-xl
                          bg-gradient-to-r from-emerald-50/50 to-teal-50/50 
                          border border-emerald-100/50"
                          >
                            <ChevronRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {course}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </NeomorphicCard>

            {/* Campus Life */}
            <NeomorphicCard className="p-8">
              <SectionTitle title="Campus Life" icon={Users} />
              <p className="text-gray-700 leading-relaxed mb-6">
                {college.campus_life}
              </p>

              {college.facilities && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Facilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {college.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-xl
                        bg-gradient-to-r from-blue-50/50 to-indigo-50/50 
                        border border-blue-100/50"
                      >
                        <Star className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {facility}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NeomorphicCard>

            {/* Research Areas */}
            {college.research && (
              <NeomorphicCard className="p-8">
                <SectionTitle title="Research & Innovation" icon={BookOpen} />
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Focus Areas
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {college.research.focus_areas.map((area, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-medium
                          bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700
                          border border-purple-100"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Research Centers
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {college.research.centers.map((center, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-xl
                          bg-gradient-to-r from-indigo-50/50 to-purple-50/50 
                          border border-indigo-100/50"
                        >
                          <Building className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {center}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NeomorphicCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <NeomorphicCard className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {college.contact?.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-700">
                      {college.contact.email}
                    </span>
                  </div>
                )}
                {college.contact?.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-700">
                      {college.contact.phone}
                    </span>
                  </div>
                )}
                {college.website && (
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="text-sm">Visit Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </NeomorphicCard>

            {/* Placements */}
            {college.placements && (
              <NeomorphicCard className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Placement Highlights
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <p className="text-sm text-gray-600">Average Package</p>
                    <p className="text-2xl font-bold text-green-600">
                      {college.placements.average_package}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <p className="text-sm text-gray-600">Highest Package</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {college.placements.highest_package}
                    </p>
                  </div>

                  {college.placements.top_recruiters && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Top Recruiters
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {college.placements.top_recruiters
                          .slice(0, 8)
                          .map((recruiter, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs font-medium rounded-full
                            bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200"
                            >
                              {recruiter}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </NeomorphicCard>
            )}

            {/* Notable Alumni */}
            {college.notable_alumni && (
              <NeomorphicCard className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Notable Alumni
                </h3>
                <div className="space-y-3">
                  {college.notable_alumni.slice(0, 6).map((alumni, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-xl
                      bg-gradient-to-r from-yellow-50/50 to-orange-50/50 border border-yellow-100/50"
                    >
                      <Users className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{alumni}</span>
                    </div>
                  ))}
                </div>
              </NeomorphicCard>
            )}

            {/* Admission Info */}
            {college.admission && (
              <NeomorphicCard className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Admission
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    {college.admission.process}
                  </p>

                  {college.admission.exams_accepted && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Accepted Exams
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {college.admission.exams_accepted.map((exam, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium rounded-full
                            bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border border-teal-100"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </NeomorphicCard>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NavColleges;
