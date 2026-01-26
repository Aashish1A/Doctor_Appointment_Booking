import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>

        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
          <img className='max-full max-w-[360px]' src={assets.contact_image} alt="Contact Us" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
            <p className='text-gray-500'>Digha Patna <br />
              PinCode 800011, Bihar, India
            </p>
            <p className='text-gray-500'>Phone: (123) 456-7890 <br />
              Email: quickmed@ourcompany.com
            </p>
            <p className='font-semibold text-gray-600'>Careers at QuickMed</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all'>Explore Jobs</button>
          </div>
        </div>
    </div>
  )
}

export default Contact