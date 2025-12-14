import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currency = '$';
  const backendURL = "https://quickmed-askv.onrender.com";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/get-profile`, {headers: {token}});
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if(token){
      loadUserProfileData();
    }else{
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,getDoctorsData,
    currency,
    backendURL,
    token,setToken,
    userData,setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
