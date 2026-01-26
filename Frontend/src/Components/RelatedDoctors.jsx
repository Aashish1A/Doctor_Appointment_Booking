import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if(doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((item) => item.speciality === speciality && item._id !== docId);
      setRelDoc(doctorsData);
    }
  }, [doctors,speciality,docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browser through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-4 gap-y-6 pt-5 px-3 sm:px-0'>
            {relDoc.slice(0,10).map((item, index) => (
                <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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
            ))}
        </div>
        <button onClick={() => {navigate("/doctors"); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer'>more</button>
    </div>
  );
};

export default RelatedDoctors;
