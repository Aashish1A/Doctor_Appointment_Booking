import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Doctors = () => {

  const navigate = useNavigate();
  const {speciality} = useParams();
  const [filterDoctor, setFilterDoctor] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const {doctors} = useContext(AppContext);

  const applyFilter = () => {
    if(speciality){
      const data = doctors.filter((item) => item.speciality === speciality);
      setFilterDoctor(data);
    }else{
      setFilterDoctor(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div className='px-4 sm:px-0'>
      <p className='text-gray-600 mb-4 sm:mb-6 text-center sm:text-left'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-3 sm:gap-5'>
        <button className={`py-1 px-3 rounded text-sm transition-all sm:hidden ${showFilter ? "bg-[#C2F6FF] text-black" : ""}`} onClick={() => setShowFilter(!showFilter)}>Filters</button>
        {/* Filter Section */}
        <div className={`flex flex-col space-y-3 text-sm text-gray-600 w-full sm:w-auto mb-4 sm:mb-0 ${showFilter ? "block" : "hidden"} sm:block`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
             className={`w-full sm:w-auto pl-3 py-2 pr-4 sm:pr-16 border border-[#79D7E7] rounded transition-all cursor-pointer text-center sm:text-left ${speciality === "General physician" ? "bg-[#C2F6FF] text-black" : ""}`}>
             General physician
          </p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
             className={`w-full sm:w-auto pl-3 py-2 pr-4 sm:pr-16 border border-[#79D7E7] rounded transition-all cursor-pointer text-center sm:text-left ${speciality === "Gynecologist" ? "bg-[#C2F6FF] text-black" : ""}`}>
             Gynecologist
          </p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
             className={`w-full sm:w-auto pl-3 py-2 pr-4 sm:pr-16 border border-[#79D7E7] rounded transition-all cursor-pointer text-center sm:text-left ${speciality === "Dermatologist" ? "bg-[#C2F6FF] text-black" : ""}`}>
             Dermatologist
          </p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
             className={`w-full sm:w-auto pl-3 py-2 pr-4 sm:pr-16 border border-[#79D7E7] rounded transition-all cursor-pointer text-center sm:text-left ${speciality === "Pediatricians" ? "bg-[#C2F6FF] text-black" : ""}`}>
             Pediatricians
          </p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
             className={`w-full sm:w-auto pl-3 py-2 pr-4 sm:pr-16 border border-[#79D7E7] rounded transition-all cursor-pointer text-center sm:text-left ${speciality === "Neurologist" ? "bg-[#C2F6FF] text-black" : ""}`}>
             Neurologist
          </p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} 
             className={`w-full sm:w-auto pl-3 py-2 pr-4 sm:pr-16 border border-[#79D7E7] rounded transition-all cursor-pointer text-center sm:text-left ${speciality === "Gastroenterologist" ? "bg-[#C2F6FF] text-black" : ""}`}>
             Gastroenterologist
          </p>
        </div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 gap-y-4 sm:gap-y-6'>
          {filterDoctor.map((item, index) => (
                <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-[#79D7E7] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 shadow-sm'>
                    <img className='bg-[#94DBE7] w-full h-40 sm:h-48 object-cover' src={item.image} alt="" />
                    <div className='p-3 sm:p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <div className="relative flex w-3.5 h-3.5 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-600"></span>
                            </div>
                            <p>Available</p>
                        </div>
                        <p className='text-gray-900 text-base sm:text-lg font-medium mb-1 leading-tight'>{item.name}</p>
                        <p className='text-gray-600 text-xs sm:text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors;