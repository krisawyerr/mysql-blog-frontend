import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));
    const donaim = "https://mysql-blog-backend.vercel.app";

    const login = async(input) => {
        const res = await axios.post(`${donaim}/api/auth/login`, input);
        setCurrentUser(res.data)
    }

    const logout = async(input) => {
        const res = await axios.post(`${donaim}/api/auth/logout`);
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
}