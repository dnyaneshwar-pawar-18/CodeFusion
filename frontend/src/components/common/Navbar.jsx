import { LogIn, LogOut, SunIcon, User, UserPlus, ChevronDown } from "lucide-react";
import React from "react";
import logo from '../../assets/logo.png';
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import ProfileInfo from "./ProfileInfo";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  const navLinks = [
    {
      to: "/doubts",
      label: "Doubts",
      dropdown: [
        { to: "/doubts/ask", label: "Ask Doubt" },
        { to: "/doubts/browse", label: "Browse Doubts" },
      ],
    },
    {
      to: "/resources",
      label: "Resources",
      dropdown: [
        { to: "/resources/articles", label: "Articles" },
        { to: "/resources/tutorials", label: "Tutorials" },
      ],
    },
    {
      to: "/mentor",
      label: "Mentor",
      dropdown: [
        { to: "/mentor/find", label: "Find Mentor" },
        { to: "/mentor/become", label: "Become a Mentor" },
      ],
    },
    {
      to: "/jobs",
      label: "Jobs",
      dropdown: [
        { to: "/jobs/preference-form", label: "Preference Form" },
        { to: "/jobs/listings", label: "Job Listings" },
        { to: "/jobs/internships", label: "Internship" },
        { to: "/jobs/courses", label: "Courses" },

      ],
    },
  ];

  return (
    <div className="bg-base-100 py-4 px-4 border-b border-base-300 w-full mx-auto relative top-0 z-40 backdrop-blur-lg">
      <div className="flex justify-between items-center px-4">
        <Link to="/" className="text-3xl font-bold text-primary flex justify-center items-center gap-3">
        <img src={logo} alt="" className="h-16 w-16 rounded-full bg-primary p-2"/>
        <h1 className="text-2xl sm:text-4xl">CodeFusion</h1>
        </Link>

        <div className="flex gap-5">
          {!user ? (
            <>
              <Link to="/signup" className="btn btn-md text-lg flex items-center gap-2">
                <UserPlus />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>

              <Link to="/signin" className="btn btn-md text-lg flex items-center gap-2">
                <LogIn />
                <span className="hidden sm:inline">Sign In</span>
              </Link>

              <Link to="/themes" className="btn btn-md text-lg flex items-center gap-2">
                <SunIcon size={28} />
                <span className="hidden sm:inline">Themes</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex gap-6">
                {navLinks.map(({ to, label, dropdown }) => (
                  <div key={to} className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `text-base-content text-lg sm:text-2xl flex items-center gap-1 relative group ${isActive ? "font-bold text-primary" : ""}`
                      }
                    >
                      {label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>

                    {dropdown && dropdown.length > 0 && (
                      <ul className="dropdown-content menu p-2 shadow bg-base-200 rounded-lg w-52 mt-5">
                        {dropdown.map(({ to, label }) => (
                          <li key={to}>
                            <NavLink
                              to={to}
                              role="button"
                              className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg text-lg sm:text-xl ${isActive ? "bg-primary text-white" : ""}`
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
              </div>


              {/* User Profile Dropdown */}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


