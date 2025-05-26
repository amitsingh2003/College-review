import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Award,
  Globe,
  Users,
  Send,
  Heart,
} from "lucide-react";
import logo from '../assets/logo.png'; // adjust path if necessary


const NeomorphicFooter = () => {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [email, setEmail] = useState("");

  const footerData = {
    "Top Colleges": [
      "IIT Madras",
      "IIT Delhi",
      "IIT Bombay",
      "IIT Kharagpur",
      "IIT Kanpur",
      "IIT Roorkee",
      "IIT Guwahati",
      "IIT Hyderabad",
      "IIT BHU",
      "IIT Indore",
    ],
    Programs: [
      "Engineering",
      "Management",
      "Medical",
      "Science",
      "Law",
      "Pharmacy",
      "Computer Application",
      "Arts",
      "Education",
    ],
    "Popular Cities": [
      "Bangalore",
      "Lucknow",
      "New Delhi",
      "Ahmedabad",
      "Gurgaon",
      "Bhopal",
      "Indore",
      "Mumbai",
      "Nagpur",
      "Pune",
    ],
    States: [
      "Tamil Nadu",
      "Uttar Pradesh",
      "Delhi",
      "Karnataka",
      "Punjab",
      "Maharashtra",
      "Gujarat",
      "Kerala",
      "West Bengal",
      "Andhra Pradesh",
    ],
    "Study Abroad": [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "United Arab Emirates",
      "Netherlands",
      "Singapore",
      "Switzerland",
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      color: "#1877f2",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: Instagram,
      name: "Instagram",
      color: "#e4405f",
      gradient: "from-pink-500 to-purple-600",
    },
    {
      icon: Twitter,
      name: "Twitter",
      color: "#1da1f2",
      gradient: "from-sky-400 to-blue-500",
    },
    {
      icon: Youtube,
      name: "YouTube",
      color: "#ff0000",
      gradient: "from-red-500 to-red-700",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      color: "#0077b5",
      gradient: "from-blue-600 to-blue-800",
    },
  ];

  const legalLinks = [
    "Contact Us",
    "Terms & Conditions",
    "Privacy Policy",
    "About Us",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="relative min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-blue-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-200/30 to-amber-200/30 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>

      <div className="relative z-10">
        {/* Hero Brand Section */}
        <div className="px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto text-center">
            {/* Neomorphic Brand Container */}
           <div className="bg-white/20 backdrop-blur-xl rounded-3xl lg:rounded-[3rem] p-8 lg:p-12 shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] border border-white/30 mb-12">
  {/* Logo + Title */}
  <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 mb-6">
    <img
      src={logo}
      alt="SCS Logo"
      className="h-14 w-auto lg:h-20 transition-all duration-500"
    />
    <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-center lg:text-left">
      SCS Educational Consultancy
    </h1>
  </div>

  {/* Description */}
  <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium text-center">
    India's most trusted education platform helping students make informed
    decisions about their academic future with comprehensive college and
    course information.
  </p>
</div>

          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Glassmorphic Content Container */}
            <div className="bg-white/30 backdrop-blur-2xl rounded-3xl lg:rounded-[3rem] p-8 lg:p-12 shadow-[25px_25px_50px_#c8d2e0,-25px_-25px_50px_#ffffff] border border-white/40">
              {/* Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
                {Object.entries(footerData).map(([category, links]) => (
                  <div key={category} className="space-y-4">
                    <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 shadow-[16px_16px_32px_#8a9fb8,-16px_-16px_32px_#ffffff] border border-white/20">
                      <h3 className="text-lg font-bold bg-gradient-to-r from-blue-800 to-violet-600 bg-clip-text text-transparent mb-4">
                        {category}
                      </h3>
                      <ul className="space-y-2">
                        {links.map((link, index) => (
                          <li key={index}>
                            <a
                              href="#"
                              className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group text-sm lg:text-base font-medium"
                            >
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-2 transform -translate-x-2 group-hover:translate-x-0 text-blue-600" />
                              <span className="group-hover:translate-x-1 transition-transform duration-300 group-hover:font-semibold">
                                {link}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              {/* Contact Information */}
              <div className="bg-gradient-to-r from-white/40 to-blue-50/40 backdrop-blur-xl rounded-3xl p-8 lg:p-10 mb-12 shadow-[inset_10px_10px_20px_#d1d9e6,inset_-10px_-10px_20px_#ffffff] border border-white/40">
                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
                  Get In Touch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Mail,
                      title: "Email Support",
                      info: "support@scsglobals.com",
                      sub: "24/7 Student Support",
                      gradient: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: Phone,
                      title: "Call Center",
                      info: "+91 12345 67890",
                      sub: "Mon-Sat 9AM-7PM",
                      gradient: "from-emerald-500 to-teal-500",
                    },
                    {
                      icon: MapPin,
                      title: "Head Office",
                      info: "Mumbai, Maharashtra",
                      sub: "Visit by Appointment",
                      gradient: "from-indigo-500 to-purple-500",
                    },
                  ].map((contact, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-[10px_10px_20px_#c8d2e0,-10px_-10px_20px_#ffffff] hover:shadow-[15px_15px_30px_#c3c9d6,-15px_-15px_30px_#ffffff] transition-all duration-500 transform hover:scale-105 border border-white/50">
                        <div
                          className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gradient-to-br ${contact.gradient} rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        >
                          <contact.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          {contact.title}
                        </h4>
                        <p className="text-gray-700 font-medium mb-1">
                          {contact.info}
                        </p>
                        <p className="text-gray-500 text-sm">{contact.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media & Newsletter */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-8">
                {/* Social Media */}
                <div className="flex flex-col items-center gap-6">
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Connect With Us
                  </span>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <div
                        key={index}
                        className="relative group"
                        onMouseEnter={() => setHoveredSocial(index)}
                        onMouseLeave={() => setHoveredSocial(null)}
                      >
                        <a
                          href="#"
                          className={`w-14 h-14 lg:w-16 lg:h-16 bg-white/60 backdrop-blur-lg rounded-2xl shadow-[8px_8px_16px_#c8d2e0,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#c3c9d6,-12px_-12px_24px_#ffffff] flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:rotate-12 border border-white/40 group`}
                        >
                          <social.icon
                            className={`w-6 h-6 lg:w-7 lg:h-7 transition-all duration-300 ${
                              hoveredSocial === index
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          />
                        </a>
                        {hoveredSocial === index && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-2xl transition-all duration-300 -z-10 shadow-lg`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Stay Updated
                  </span>
                  <div className="flex w-full sm:w-auto">
                    <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-[inset_5px_5px_10px_#c8d2e0,inset_-5px_-5px_10px_#ffffff] p-2 flex border border-white/40">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="px-4 py-3 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full sm:w-64 lg:w-80 font-medium"
                      />
                      <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group transform hover:scale-105"
                      >
                        <Send className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-white font-semibold">
                          Subscribe
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-[15px_15px_30px_#c8d2e0,-15px_-15px_30px_#ffffff] border border-white/50">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Legal Links */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8">
                  {legalLinks.map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-semibold hover:scale-105 transform hover:bg-white/50 px-3 py-1 rounded-lg"
                    >
                      {link}
                    </a>
                  ))}
                </div>

                {/* Copyright */}
                <div className="text-center lg:text-right">
                  <p className="text-gray-700 text-sm font-semibold flex items-center justify-center lg:justify-end gap-2">
                    © 2024 SCS Educational Consultancy | Made with{" "}
                    <Heart className="w-4 h-4 text-red-500 animate-pulse" /> for
                    Students
                  </p>
                  <p className="text-gray-500 text-xs mt-1 font-medium">
                    Trusted by millions of students across India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NeomorphicFooter;
