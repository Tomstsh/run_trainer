import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

type AuthContextType = {
  user: any;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext)!;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [ user, setUser ] = useState<any>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            setLoading(false);
            return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        async function fetchData() {
            try {
                const userResponse = await axios.get('/users/get_user_data/');
                const userData = userResponse.data;

                setUser({ ...userData, isAuthenticated: true });
            } catch (err) {
                console.error(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/api/token/', { username, password});
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            
            const userResponse = await axios.get('/users/get_user_data/');
            const userData = userResponse.data;
            setUser({ ...userData, isAuthenticated: true });
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
