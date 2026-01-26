import React, { useState, useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-5 px-4 md:px-0 border-b border-[#79D7E7] relative">
      
      {/* Logo */}
      <img onClick={() => navigate("/")} src={assets.logo} alt="logo" className="w-44 cursor-pointer" />

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
        {["/", "/doctors", "/about", "/contact"].map((path, i) => (
          <NavLink key={i} to={path}>
            {({ isActive }) => (
              <li className={`relative py-1 hover:text-[#06b6d4] transition ${isActive ? 'text-[#06b6d4]' : ''}`}>
                {["HOME", "ALL DOCTORS", "ABOUT", "CONTACT"][i]}
                {isActive && <hr className="absolute bottom-0 left-0 right-0 border-none h-0.5 bg-[#06b6d4] mx-auto w-3/5" />}
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            
            {/* Profile */}
            <img src={userData.image || assets.profile_pic} alt="profile" className="w-9 h-9 rounded-full object-cover" />

            {/* Arrow */}
            <img src={assets.dropdown_icon} alt="dropdown" className="w-3 transition-transform duration-300 group-hover:rotate-180" />

            {/* Dropdown */}
            <div className="absolute right-0 top-12 opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 z-30">
              <div className="min-w-48 bg-white rounded-xl shadow-lg border p-4 flex flex-col gap-3">
                <p onClick={() => navigate("/my-profile")} className="hover:text-[#06b6d4] cursor-pointer" >
                  My Profile
                </p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-[#06b6d4] cursor-pointer" >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-red-500 cursor-pointer" >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="hidden md:block bg-[#06b6d4] hover:bg-[#06b6d4]/80 text-white px-7 py-3 rounded-full transition">
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt="menu" />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 transform ${showMenu ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden`}>
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <img className="w-36" src={assets.logo} alt="logo" />
          <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" />
        </div>

        <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">All Doctors</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact</NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
