import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const Appointment = () => {

  const {docId} = useParams();
  const {doctors} = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((item) => item._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  return docInfo && (
    <div>
        {/* ---------- Doctor Information ---------- */}
        <div>

          <div>
            <img src={docInfo?.image} alt="" />
          </div>

          <div>
            {/* -------- Doctor Details ---------- */}
            <p>{docInfo?.name} <img src={assets.verified_icon} alt="" /></p>
            <div>
              <p>{docInfo?.degree} - {docInfo?.speciality}</p>
              <button>{docInfo?.experience}</button>
            </div>
            {/* -------- Doctor About ---------- */}
            <div>
              <p>About <img src={assets.info_icon} alt="" /></p>
              <p>{docInfo?.about}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Appointment