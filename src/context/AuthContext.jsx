import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setLoading(false);
            return;
        }
        api.get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => localStorage.removeItem("access_token"))
        .finally(() => setLoading(false)); 
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", {email, password})
        localStorage.setItem("access_token", res.data.access_token);
        setUser(res.data.user);
        return res.data.user;
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    };

    const register = async ({ nama, email, password, no_hp, role}) => {
        const res = await api.post('/auth/register', {
            nama, email, password, no_hp, role,
        });
        return res.data;
    };

    return (
        <AuthContext.Provider value={{user, login, logout, register, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);