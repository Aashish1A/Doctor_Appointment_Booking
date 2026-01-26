import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-12'>
          <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="about_image" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>Welcome to QuickMed, your trusted healthcare companion for seamless online doctor consultations. We connect patients with qualified healthcare professionals, making quality medical care accessible anytime, anywhere.</p>
            <p>QuickMed is committed to revolutionizing healthcare delivery through technology. We provide a secure platform where you can book appointments in under 60 seconds, consult with experienced doctors across multiple specialties, and manage your health journey with confidence.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission is to make healthcare accessible and convenient for everyone. We strive to eliminate barriers between patients and healthcare providers, ensuring you receive expert medical advice and care when you need it most, from the comfort of your home.</p>
          </div>
        </div>

        <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
        </div>

        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border border-[#c2f6ff] px-10 md:px-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-[#06B5D4] hover:text-white transition-all duration-300 cursor-pointer'>
            <b>Lightning Fast Booking:</b>
            <p>Book appointments with top doctors in under 60 seconds. No waiting, no hassle - just instant access to quality healthcare.</p>
          </div>

          <div className='border border-[#c2f6ff] px-10 md:px-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-[#06B5D4] hover:text-white transition-all duration-300 cursor-pointer'>
            <b>Verified Specialists:</b>
            <p>Connect with 150+ certified doctors across multiple specialties. Every healthcare professional on our platform is thoroughly verified.</p>
          </div>

          <div className='border border-[#c2f6ff] px-10 md:px-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-[#06B5D4] hover:text-white transition-all duration-300 cursor-pointer'>
            <b>Secure & Private:</b>
            <p>Your health data is protected with advanced encryption. Enjoy confidential consultations in a safe, HIPAA-compliant environment.</p>
          </div>
        </div>
    </div>
  )
}

export default About