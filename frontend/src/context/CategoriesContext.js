import React, { createContext, useState, useEffect } from 'react';
import axios from './axiosConfig';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => React.useContext(CategoryContext);