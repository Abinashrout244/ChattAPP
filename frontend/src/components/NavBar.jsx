import React, { useState } from "react";
import { LogIn, LogOut, MessageCircle, Settings, User } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(true);
  return (
    <div className="navbar bg-[#2F3136] shadow-sm px-6 py-3 fixed top-0 left-0 right-0 z-20">
      {/* Left: Logo */}
      <Link to="/" className="flex-1 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3">
          {/* Logo Icon */}
          <div className="w-10 h-10 bg-[#5865F2] rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>

          {/* App Name */}
          <span className="font-logo text-white font-semibold text-xl select-none ">
            Chat Sphere
          </span>
        </div>
      </Link>
      {/* Right: Profile Dropdown */}
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border-2 border-gray-400">
              <img alt="Profile" src="https://i.pravatar.cc/40?img=5" />
            </div>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content 
  bg-[#36393F] text-gray-200 
  rounded-lg border border-[#4f545c]
  z-50 mt-3 w-52 p-2 shadow-md"
          >
            <Link to="/settings">
              <li>
                <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10">
                  <Settings size={16} />
                  Settings
                </a>
              </li>
            </Link>

            <Link to="/login">
              <li>
                <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10">
                  <LogIn size={16} />
                  Login
                </a>
              </li>
            </Link>

            {user && (
              <>
                <Link to="/profile">
                  <li>
                    <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10">
                      <User size={16} />
                      Profile
                    </a>
                  </li>
                </Link>

                <Link>
                  <li>
                    <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10">
                      <LogOut size={16} />
                      Logout
                    </a>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
