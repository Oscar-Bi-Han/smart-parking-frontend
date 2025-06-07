import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/auth/checkauth`, { withCredentials: true }); // Endpoint to fetch authenticated user
                setAuthUser(response.data.user);
            } catch (error) {
                console.error('Error fetching authenticated user:', error);
                setAuthUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthUser();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/auth/login`, { email, password },  { withCredentials: true });
            setAuthUser(response.data.user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await axios.post(`${API_URL}/auth/logout`,  { withCredentials: true });
            setAuthUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthUserContext.Provider value={{ authUser, loading, login, logout }}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuthUser = () => useContext(AuthUserContext);
