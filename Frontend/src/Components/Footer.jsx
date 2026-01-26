import React from 'react'
import { assets } from '../assets/assets_frontend/assets'


const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* Left Section */}
            <div>
              <img className='mb-5 w-40' src={assets.logo} alt="logo" />
              <p className='w-full md:w-2/3 text-gray-600 leading-6'>Your trusted healthcare companion. Book appointments with qualified doctors, get expert consultations, and manage your health records - all in one place. Experience seamless healthcare at your fingertips.</p>
            </div>

            {/* Center Section */}
            <div>
              <p className='text-xl font-medium mb-5'>COMPANY</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                <li><a href="#">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            {/* Right Section */}
            <div>
              <p className='text-xl font-medium mb-5'>Get in Touch</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 9341276657</li>
                <li>aashishkumar93412@gmail.com</li>
              </ul>
            </div>
        </div>
        {/* ----------Copyright Text ------------ */}
        <div>
          <hr />
          <p className='py-5 text-sm text-center'>© 2025 QuickMed Company. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer