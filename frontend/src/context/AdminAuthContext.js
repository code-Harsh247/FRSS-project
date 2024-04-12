import React, { createContext, useState, useContext } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    // Initialize isAdminLoggedIn state with the value from localStorage, if available
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const adminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn', 'true'); // Store isAdminLoggedIn state in localStorage
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn'); // Remove isAdminLoggedIn state from localStorage
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
