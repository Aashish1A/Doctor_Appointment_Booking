import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const { backendURL, dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      };

      const { data } = await axios.post(
        `${backendURL}/api/doctor/update-profile`,
        updateData,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>

        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

          {/* Doctor Info: name, degree, experience */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
            {profileData.name}
          </p>
          
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* Doctor About */}
          <div className='mt-4'>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800'>
              About:
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>

          {/* Appointment Fee */}
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>${isEdit ? (
              <input 
                type="number" 
                className='border border-gray-300 px-2 py-1 rounded w-20'
                value={profileData.fees}
                onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
              />
            ) : profileData.fees}</span>
          </p>

          {/* Address */}
          <div className='flex gap-2 py-2'>
            <p className='font-medium text-sm text-neutral-800'>Address:</p>
            <p className='text-sm'>
              {isEdit ? (
                <div className='flex flex-col gap-1'>
                  <input 
                    type="text" 
                    className='border border-gray-300 px-2 py-1 rounded w-full'
                    value={profileData.address.line1}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, line1: e.target.value } 
                    }))}
                  />
                  <input 
                    type="text" 
                    className='border border-gray-300 px-2 py-1 rounded w-full'
                    value={profileData.address.line2}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, line2: e.target.value } 
                    }))}
                  />
                </div>
              ) : (
                <>
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </>
              )}
            </p>
          </div>

          {/* Availability Checkbox */}
          <div className='flex gap-1 pt-2'>
            <input 
              type="checkbox" 
              checked={profileData.available}
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              disabled={!isEdit}
              className='cursor-pointer'
            />
            <label className='text-sm'>Available</label>
          </div>

          {/* Edit/Save Button */}
          {isEdit ? (
            <button 
              onClick={updateProfile}
              className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'
            >
              Save
            </button>
          ) : (
            <button 
              onClick={() => setIsEdit(true)}
              className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'
            >
              Edit
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default DoctorProfile