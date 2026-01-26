import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="w-full py-12 lg:py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-22">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 lg:pt-20 order-2 lg:order-1">
          
          {/* Badges */}
          <div className="flex gap-4 flex-wrap">
            <span className="px-4 py-3 text-sm rounded-lg text-[#10784E] bg-[#BAFFE3]">
              5000+ People Globally
            </span>
            <span className="px-4 py-3 text-sm rounded-lg text-[#95750D] bg-[#F2E4B7]">
              24/7 Consultations
            </span>
            <span className="px-4 py-3 text-sm rounded-lg text-[#8F484A] bg-[#FDD6D7] hidden md:block">
              Best Medical Facilities
            </span>
          </div>

          {/* Heading & Description */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Online Consultation, <span className="text-[#06B5D4]">Connecting Doctors and Patients</span> Anywhere
            </h1>
            <p className="text-gray-600 max-w-xl">
              Connect with trusted doctors anytime, anywhere. QuickMed brings expert medical advice to your fingertips for seamless, secure healthcare.
            </p>
          </div>

          {/* Profiles & Info */}
          <div className="flex items-center gap-3 text-sm">
            <img className="w-28" src={assets.group_profiles} alt="profiles" />
            <p className="text-gray-700">
              Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
          </div>

          {/* Button */}
          <a href="#speciality" className="flex items-center gap-2 bg-[#06B5D4] hover:bg-[#06B5D4]/90 text-white px-6 py-3 rounded-full w-max transition-all mb-12">
            Book appointment 
            <img className="w-3" src={assets.arrow_icon} alt="arrow" />
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-center order-1 lg:order-2">
          <div className="relative w-80 h-80 lg:w-110 lg:h-110">
            <img src={assets.heroDoctorBg} alt="background" className="absolute inset-0 w-full h-full object-cover rounded-full shrink-0" />
            <img src={assets.header_img} alt="doctor" className="absolute inset-0 w-full h-full object-contain z-10" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around items-center text-gray-600 py-4 bg-gray-100">
        <span>5000+ Treated</span>
        <span>150+ Doctors</span>
        <span>4000+ Positive Impressions</span>
      </div>
    </div>
  );
};

export default Header;
