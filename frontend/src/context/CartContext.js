// CartContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the Cart Context
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Fetch user ID from the backend
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (!token) {
          console.log("Token not found");
          throw new Error('Token not found in local storage');
        }
        const response = await axios.post('/users/get-user-id', { token });
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchCartData = async () => {
        try {
          console.log(userId)
          // Fetch cart data from backend using user ID
          const response = await axios.get(`/users/cart/${userId}`);
          setCartData(response.data.cartData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching cart data:', error);
          setLoading(false);
        }
      };

      fetchCartData();
    }
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartData, loading, setLoading, userId }}>
      {children}
    </CartContext.Provider>
  );
};
