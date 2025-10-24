import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken") : "");

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const value = {
        aToken,
        setAToken,
        backendURL
    }


    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
