import { LogOut, SunIcon, User, UserPlus } from "lucide-react";
import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import { useMentorStore } from "../../store/useMentorStore";

const ProfileInfo = () => {
  const { user, logout } = useAuthStore();
  const { mentor, logoutMentor } = useMentorStore();
  return (
    <div className="text-center px-5 py-4">
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-col">
          {user ? (
            <>
              <div className="relative bg-base-100 p-4 rounded-full">
                <User size={32} />
              </div>
              <h3 className="text-lg sm:text-2xl mt-2">
                {user?.firstName + " " + user?.lastName}
              </h3>
              <p className="mt-2 text-lg sm:text-xl">{user.email}</p>
            </>
          ) : (
            <>
              <div className="relative bg-base-100 p-4 rounded-full">
                <User size={32} />
              </div>
              <h3 className="text-lg sm:text-2xl mt-2">
                {mentor.firstName + " " + mentor.lastName}
              </h3>
              <p className="mt-2 text-lg sm:text-xl">{mentor.email}</p>
            </>
          )}
        </div>

        <span className="border-b border-accent h-2 w-full mt-3"></span>

        <div className="w-full mt-5">
          <Link
            to="/themes"
            className="btn btn-md text-lg bg-transparent hover:border-primary w-full mt-2"
          >
            <SunIcon size={24} />
            <p className="hidden sm:inline">Themes</p>
          </Link>

          <Link
            to="/"
            className="btn btn-md text-lg bg-transparent border hover:border-primary w-full mt-2"
            onClick={user ? logout : logoutMentor}
          >
            <LogOut size={24} />
            <h1 className="hidden sm:inline">Logout</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
