import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {backendURL, token, setToken} = useContext(AppContext);
  const navigate = useNavigate();

  const [state,setState] = useState("Sign Up");

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if(state === "Sign Up"){
        const {data} = await axios.post(`${backendURL}/api/user/register`,{name,email,password});
        if(data.success){
          setToken(data.token);
          localStorage.setItem("token",data.token);
        }else{
          toast.error(data.message);
        }
      }else{
        const {data} = await axios.post(`${backendURL}/api/user/login`,{email,password});
        if(data.success){
          setToken(data.token);
          localStorage.setItem("token",data.token);
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token){
      navigate("/");
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className='flex flex-col gpa-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create an account" : "Login"}</p>
        <p className='pt-1 pb-3'>Please {state === "Sign Up" ? "sign up" : "login"} to book an appointment</p>
        {state === "Sign Up" && 
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button className='bg-[#06B5D4] text-white w-full py-2 rounded-md text-base mt-2' type="submit">{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" ?
          <p className='text-sm'>Already have an account? <span onClick={() => setState("Login")} className='text-[#4fc9df] cursor-pointer underline'>Login here</span></p>
          :
          <p className='text-sm'>Don't have an account? <span onClick={() => setState("Sign Up")} className='text-[#4fc9df] cursor-pointer underline'>Sign Up</span></p>
        }
      </div>
    </form>
  )
}

export default Login