import React from 'react'
import { assets } from '../assets/assets_frontend/assets'


const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* Left Section */}
            <div>
              <img className='mb-5 w-40' src={assets.logo} alt="logo" />
              <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero quaerat in architecto unde sunt laudantium consequatur tempora sed eveniet exercitationem.</p>
            </div>

            {/* Center Section */}
            <div>
              <p className='text-xl font-medium mb-5'>COMPANY</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Right Section */}
            <div>
              <p className='text-xl font-medium mb-5'>Get in Touch</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 1244645654</li>
                <li>info@example.com</li>
              </ul>
            </div>
        </div>
        {/* ----------Copyright Text ------------ */}
        <div>
          <hr />
          <p className='py-5 text-sm text-center'>© 2025 Your Company. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer