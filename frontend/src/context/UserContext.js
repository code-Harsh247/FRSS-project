import React, { createContext, useState, useEffect } from 'react';
import axios from './axiosConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetch user data from the server
                const response = await axios.get('users/allusers');

                // Set the user state
                setUser(response.data.users);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => React.useContext(UserContext);
