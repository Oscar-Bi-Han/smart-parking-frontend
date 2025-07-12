import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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
                toast('Please log in to access the platform.', { icon: '✋',});
                setAuthUser(null);
            } finally {
                setLoading(false)
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
            toast.error('Login failed. Please check your credentials and try again.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await axios.post(`${API_URL}/auth/logout`,  null, { withCredentials: true });
            setAuthUser(null);
            toast.success('Logged out!');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/auth/register`, { email, password });
            return response.data.message || "Registration successful!";
        } catch (error) {
            console.error('Register error:', error);
            toast.error('Registration failed. Please try again.');
            throw error.response?.data?.message || "An error occurred during registration.";
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthUserContext.Provider value={{ authUser, loading, login, logout, register }}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuthUser = () => useContext(AuthUserContext);
