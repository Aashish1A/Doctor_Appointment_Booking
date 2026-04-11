import React, { useContext, useState, useEffect, useCallback } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  
  const {backendURL, token, getDoctorsData} = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormatter = (slotDate) => {
    const dateArray = slotDate.split('-');
    const day = dateArray[0];
    const monthIndex = parseInt(dateArray[1]) - 1; // Month is 0-indexed
    const year = dateArray[2];
    
    return `${day} ${months[monthIndex]}, ${year}`;
  }

  const fetchAppointments = useCallback(async () => {
    try {
      const {data} = await axios.get(`${backendURL}/api/user/appointments`,{headers: {token}});
      if(data.success){
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendURL, token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(`${backendURL}/api/user/cancel-appointment`, {appointmentId}, {headers: {token}});
      if(data.success){
        toast.success(data.message);
        fetchAppointments();
        getDoctorsData();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token) fetchAppointments();
  }, [token, fetchAppointments])

  return (
    <div className=''>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
        <div>
          {appointments.map((item, index) => (
            <div key={index} className='grid grid-cols[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-[#79D7E7]'>
              <div>
                <img className='w-32 bg-[#94DBE7]' src={item.docId.image} alt="image" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docId.name}</p>
                <p>{item.docId.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docId.address.line1}</p>
                <p className='text-xs'>{item.docId.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormatter(item.slotDate)} |  {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {/* Show different UI based on appointment status */}
                {item.cancelled ? (
                  <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 cursor-not-allowed' disabled>
                    Cancelled
                  </button>
                ) : item.isCompleted ? (
                  <button className='sm:min-w-48 py-2 border border-green-500 bg-green-50 text-green-700 cursor-not-allowed' disabled>
                    Completed
                  </button>
                ) : (
                  <>
                    {!item.payment && (
                      <button onClick={() => toast.info('Payment gateway will be added soon. Please stay tuned.')} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 hover:bg-slate-200 border transition-all duration-300'>
                        Pay Online
                      </button>
                    )}
                    <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300' >
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default MyAppointments