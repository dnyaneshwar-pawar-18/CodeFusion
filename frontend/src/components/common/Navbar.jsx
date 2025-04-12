import { LogIn, LogOut, SunIcon, User, ChevronDown, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import ProfileInfo from "./ProfileInfo";
import { useMentorStore } from "../../store/useMentorStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { mentor, logout: logoutMentor } = useMentorStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const navLinks = [
    {
      to: "/doubts",
      label: "Doubts",
      subLinks: [
        { to: "/doubts/ask", label: "Ask Doubt" },
        { to: "/doubts/browse", label: "Browse Doubts" },
      ],
    },
    {
      to: "/resources",
      label: "Resources",
      subLinks: [
        { to: "/resources/create", label: "Create" },
        { to: "/resources/explore", label: "Explore" },
      ],
    },
    {
      to: "/mentors",
      label: "Mentor",
      subLinks: [
        { to: "/mentors/subscribed-mentors", label: "Subscribed Mentors" },
        { to: "/mentor/become", label: "Become a Mentor" },
      ],
    },
    {
      to: "/jobs",
      label: "Jobs",
      subLinks: [
        // { to: "/jobs/preference-form", label: "Preference Form" },
        { to: "/jobs/listings", label: "Job Listings" },
        { to: "/jobs/internships", label: "Internship" },
        { to: "/jobs/courses", label: "Courses" },
      ],
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLink = (index) => {
    setActiveLink(activeLink === index ? null : index);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const closeSidebar = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-base-100 py-4 px-4 border-b border-base-300 w-full mx-auto sticky top-0 z-40 backdrop-blur-lg">
      <div className="flex justify-between items-center px-4">
        <Link to="/" className="text-3xl font-bold text-primary flex justify-center items-center gap-2 sm:gap-3">
          <img src={logo} alt="logo" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary p-2" />
          <h1 className="text-2xl sm:text-4xl">CodeFusion</h1>
        </Link>

        <div className="flex gap-5 items-center">
          {user || mentor ? (
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(({ to, label, subLinks }) => (
                <div key={to} className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                  <NavLink
                    to={to}
                    tabIndex={0}
                    className={({ isActive }) =>
                      `btn btn-ghost text-lg sm:text-2xl flex items-center gap-1 ${isActive ? "font-bold" : ""}`
                    }
                  >
                    {label}
                  </NavLink>

                  {subLinks && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
                    >
                      {subLinks.map(({ to, label }) => (
                        <li key={to}>
                          <NavLink
                            to={to}
                            className={({ isActive }) =>
                              `btn btn-ghost justify-start ${isActive ? "btn-active" : ""}`
                            }
                          >
                            {label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="bg-base-300 p-4 rounded-full">
                  <User size={32} />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg-base-300 rounded-xl z-[1] w-52 sm:w-72 p-2 shadow mt-5"
                >
                  <ProfileInfo />
                </div>
              </div>
            </div>
          ) : (
            <Link to="/themes" className="btn btn-md text-lg flex items-center gap-2">
              <SunIcon size={28} />
              <span className="hidden sm:inline">Themes</span>
            </Link>
          )}

          {
            user && (
              <button onClick={toggleMenu} className="md:hidden text-primary text-lg">
                <Menu />
              </button>
            )
          }
        </div>
      </div>

      {isMenuOpen && (
        <>
          {/* <div className="fixed inset-0 bg-opacity-50 z-40" onClick={closeSidebar}></div> */}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 min-h-screen w-64 bg-base-300 shadow-lg p-4 z-50"
          >
            <button onClick={closeSidebar} className="text-primary text-lg mb-4 bg-base-200 p-2 rounded-full">
              <X />
            </button>

            {navLinks.map(({ to, label, subLinks }, index) => (
              <div key={to} className="mb-4">
                <button
                  onClick={() => toggleLink(index)}
                  className="text-lg flex justify-between w-full text-base-content py-2 px-4 bg-base-200 rounded-lg"
                >
                  {label}
                  <ChevronDown
                    className={`transform transition-transform ${activeLink === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {activeLink === index && subLinks && (
                  <ul className="pl-6 mt-2 space-y-2">
                    {subLinks.map(({ to, label }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          className={({ isActive }) =>
                            `block py-2 rounded-lg text-lg hover:font-bold ${isActive ? "font-bold" : "text-base-content"
                            }`
                          }
                          onClick={closeSidebar}
                        >
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {user && (
              <div className="mt-4">
                <button onClick={toggleProfile} className="text-lg flex items-center w-full py-2 px-4 bg-base-200 rounded-lg">
                  Profile
                  <ChevronDown className={`ml-auto transform transition-transform ${showProfile ? "rotate-180" : ""}`} />
                </button>
                {showProfile && (
                  <div className="mt-2 bg-base-200 rounded-lg p-4">
                    <ProfileInfo />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Navbar;

