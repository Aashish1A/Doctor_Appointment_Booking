import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../Components/RelatedDoctors';

const Appointment = () => {

  const {docId} = useParams();
  const {doctors, currency} = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(''); 

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((item) => item._id === docId);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // Getting current date
    let today = new Date();

    for(let i=0; i<7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date(currentDate);
      endTime.setHours(21,0,0,0);

      // setting hours
      if(today.getDate() === currentDate.getDate()) {
        // For today, start from current time + 1 hour or 10 AM, whichever is later
        let currentHour = today.getHours();
        let currentMinute = today.getMinutes();
        
        if(currentHour >= 21) {
          // If it's past 9 PM, skip today
          continue;
        }
        
        if(currentHour < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else {
          currentDate.setHours(currentHour);
          currentDate.setMinutes(currentMinute > 30 ? 30 : 0);
          // Add 30 minutes buffer for booking
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        // increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Only add if there are time slots available
      if(timeSlots.length > 0) {
        setDocSlots(prev => ([...prev, timeSlots]));
      }
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return docInfo && (
    <div>
        {/* ---------- Doctor Information ---------- */}
        <div className='flex flex-col md:flex-row gap-4'>

          <div>
            <img className='bg-[rgb(95,111,255)] sm:max-w-72 rounded-lg' src={docInfo?.image} alt="" />
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* -------- Doctor Details ---------- */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo?.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo?.degree} - {docInfo?.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo?.experience}</button>
            </div>
            {/* -------- Doctor About ---------- */}
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo?.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment fee: <span className='text-gray-600'>{currency}{docInfo?.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'> 
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length && docSlots.map((slots, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex == index ? 'bg-[rgb(95,111,255)] text-white' : 'border border-gray-200'}`} key={index}>
                <p>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
                <p>{slots[0] && slots[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {docSlots.length && docSlots[slotIndex].map((slot, idx) => (
              <p onClick={()=> setSlotTime(slot.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === slot.time ? 'bg-[rgb(95,111,255)] text-white' : 'border border-gray-200'}`} key={idx}>{slot.time}</p>
            ))}
          </div>

          <button className='bg-[rgb(95,111,255)] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Appointment</button>
        </div>
        
        {/* Listing related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
        
    </div>
  )
}

export default Appointment