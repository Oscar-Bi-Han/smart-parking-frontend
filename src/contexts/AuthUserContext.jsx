import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/auth/checkauth', { withCredentials: true }); // Endpoint to fetch authenticated user
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
            const response = await axios.post('http://localhost:5000/auth/login', { email, password },  { withCredentials: true });
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
            await axios.post('http://localhost:5000/auth/logout',  { withCredentials: true });
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
