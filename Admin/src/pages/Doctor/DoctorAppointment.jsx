import React from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {

  const {dToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext);

  useEffect(() => {
    if(dToken){
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.length === 0 ? (
          <p className='text-center py-10 text-gray-500'>No appointments found</p>
        ) : (
          appointments.reverse().map((item, index) => (
            <div key={item._id} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full' src={item.userId?.image} alt="" />
                <p>{item.userId?.name || 'N/A'}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment ? 'Online' : 'Cash'}
                </p>
              </div>
              <p className='max-sm:hidden'>{item.userId?.dob ? calculateAge(item.userId.dob) : 'N/A'}</p>
              <p>{item.slotDate}, {item.slotTime}</p>
              <p>${item.amount}</p>
              <div className='flex gap-2'>
                {item.cancelled ? (
                  <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-medium'>Completed</p>
                ) : (
                  <>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-10 cursor-pointer'
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-10 cursor-pointer'
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Helper function to calculate age
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

export default DoctorAppointment