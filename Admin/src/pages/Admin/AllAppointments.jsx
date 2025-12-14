import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext);

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob || dob === "Not Selected") return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div key={index} className='flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-2 py-3 px-6 border-b hover:bg-gray-50'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2 text-gray-800'>
              <img className='w-8 h-8 rounded-full' src={item.userId?.image} alt="" />
              <p>{item.userId?.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userId?.dob)}</p>
            <p>{item.slotDate}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docId?.image} alt="" />
              <p>{item.docId?.name}</p>
            </div>
            <p>${item.amount}</p>
            <div className='flex gap-2'>
              {item.cancelled 
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments