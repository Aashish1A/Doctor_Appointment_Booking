import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browser through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-4 gap-y-6 pt-5 px-3 sm:px-0'>
            {doctors.length === 0 
            ? // Skeleton Loading Effect
              Array(10).fill(0).map((_, index) => (
                <div key={index} className='border border-gray-200 rounded-xl overflow-hidden animate-pulse'>
                    <div className='bg-gray-200 h-64 w-full'></div>
                    <div className='p-4'>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='w-3 h-3 bg-gray-200 rounded-full'></div>
                            <div className='h-3 bg-gray-200 rounded w-16'></div>
                        </div>
                        <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                        <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                    </div>
                </div>
              ))
            : // Actual Doctor Cards
              doctors.slice(0,10).map((item, index) => (
                <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border border-[#79D7E7] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-[#94DBE7]' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <div className="relative flex w-3.5 h-3.5 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-600"></span>
                            </div>
                            <p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
              ))
            }
        </div>
        <button onClick={() => {navigate("/doctors"); scrollTo(0,0)}} className='bg-[#CAEBF1] text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer'>more</button>
    </div>
  )
}

export default TopDoctors