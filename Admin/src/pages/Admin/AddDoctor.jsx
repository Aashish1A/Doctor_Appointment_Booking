import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const [docImage, setDocImage] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("");
    const [speciality, setSpeciality] = useState("General physician");
    const [about, setAbout] = useState("");
    const [degree, setDegree] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const {backendURL, aToken} = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if(!docImage){
                return toast.error("Please upload doctor image");
            }
            const formData = new FormData();
            formData.append("image", docImage);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("speciality", speciality);
            formData.append("about", about);
            formData.append("degree", degree);
            formData.append("address", JSON.stringify({line1: address1, line2: address2}));

            // Console.log(...formData);
            formData.forEach((value, key) => {
                console.log(key + ': ' + value);
            });

            const {data} = await axios.post(`${backendURL}/api/admin/add-doctor`, formData, {
                headers: {
                    aToken
                }
            });

            if(data.success){
                toast.success(data.message);
                // Reset form
                setDocImage(null);
                setName("");
                setEmail("");
                setPassword("");
                setFees("");
                setAbout("");
                setDegree("");
                setAddress1("");
                setAddress2("");
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
        <p className='mb-3 text-lg font-medium'>Add Doctor</p>
        <div className='bg-white px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id='doc-img' hidden />
                <p>Upload doctor <br /> picture</p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                {/* Left Column */}
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Name</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Password</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Experience</p>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)} className='border rounded px-3 py-2' name="" id="">
                            <option value="1 year">1 year</option>
                            <option value="2 year">2 year</option>
                            <option value="3 year">3 year</option>
                            <option value="4 year">4 year</option>
                            <option value="5 year">5 year</option>
                            <option value="6 year">6 year</option>
                            <option value="7 year">7 year</option>
                            <option value="8 year">8 year</option>
                            <option value="9 year">9 year</option>
                            <option value="10 year">10 year</option>
                        </select>
                    </div>

                    <div>
                        <p>Fees</p>
                        <input value={fees} onChange={(e) => setFees(e.target.value)} className='border rounded px-3 py-2' type="number" placeholder='Your Fees' required />
                    </div>
                </div>
                {/* Right Column */}
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Speciality</p>
                        <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className='border rounded px-3 py-2' name="" id="">
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Education</p>
                        <input value={degree} onChange={(e) => setDegree(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Address</p>
                        <input value={address1} onChange={(e) => setAddress1(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
                        <input value={address2} onChange={(e) => setAddress2(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
                    </div>
                </div>
            </div>

            <div>
                <p className='mt-4 mb-2'>About Doctor</p>
                <textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full px-4 pt-2 border rounded'  placeholder='Write about doctor...' rows={5} required></textarea>
            </div>

            <button type='submit' className='bg-[#06B5D4] px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add Doctor</button>
        </div>
    </form>
  )
}

export default AddDoctor