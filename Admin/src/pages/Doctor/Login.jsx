import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../../context/DoctorContext';

const Login = () => {

    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAToken, backendURL } = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if(state === "Admin"){
                const {data} = await axios.post(`${backendURL}/api/admin/admin-login`, {
                    email,
                    password
                });

                if(data.success){
                    localStorage.setItem("aToken", data.token);
                    setAToken(data.token);
                }else{
                    toast.error(data.message);
                }

            }
            else{
                const {data} = await axios.post(`${backendURL}/api/doctor/login`, {
                    email,
                    password
                });

                if(data.success){
                    localStorage.setItem("dToken", data.token);
                    setDToken(data.token);
                    console.log(data.token);
                }else{
                    toast.error(data.message);
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-[#06B5D4]'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-[#dadada] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='border border-[#dadada] rounded w-full p-2 mt-1' type="password" required />
            </div>
            <button className='bg-[#06B5D4] text-white rounded w-full p-2 mt-3 cursor-pointer'>Login</button>
            {
                state === "Admin" ?
                <p className='text-sm m-auto'>Doctor Login? <span onClick={() => setState("Doctor")} className='text-[#4fc9df] underline cursor-pointer'>Click here</span></p>
                :
                <p className='text-sm m-auto'>Admin Login? <span onClick={() => setState("Admin")} className='text-[#4fc9df] underline cursor-pointer'>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login