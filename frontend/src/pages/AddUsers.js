import React, { useState } from "react";
import "./Css/AddUsers.css";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";
import axios from "../context/axiosConfig";


const AddUsers = () => {
    const [nameInput, setnameInput] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [emailInput, setemailInput] = useState("");
    const [passwordInput, setpasswordInput] = useState("");
    
    
    


    const handlenameInputChange = (e) => {
        setnameInput(e.target.value);
    };

    const handlephoneNumberChange = (e) => {
        setphoneNumber(e.target.value);
    };

    const handleemailInputChange = (e) => {
        setemailInput(e.target.value);
    };

    const handlepasswordInputChange = (e) => {
        setpasswordInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  //Prevents page refresh when button is clicked. (Happens when button is inside a form element)
        try {
            // Check if name, phone, email, and password are entered
            if (!nameInput || !phoneNumber || !emailInput || !passwordInput) {
                return alert('Please fill in all the fields');
            }
    
            // Validate phone number format
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phoneNumber)) {
                return alert('Please enter a valid phone number (10 digits)');
            }
    
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput)) {
                return alert('Please enter a valid email address');
            }
    
            // Validate password format: At least one number, one capital letter, and at least 8 characters
            const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(passwordInput)) {
                return alert('Password must contain at least one number, one capital letter, and be at least 8 characters long');
            }
    
            const response = await axios.post('/users/signup', {
                name: nameInput,
                phone: phoneNumber,
                email: emailInput,
                password: passwordInput,
                cart: []
            });
    
            if (response.status === 200) {
                alert('User Added Successfully');
                const token = response.data.token; // Access token from response data
                localStorage.setItem('token', token);
                console.log(response.data);
            } else {
                const errorMessage = response.data.errors || 'Signup failed';
                alert(errorMessage);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(`Error: ${error.response.data.errors}`);
            } else if (error.request) {
                // The request was made but no response was received
                alert('No response received from the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                alert('An error occurred. Please try again.');
            }
        }
        
    };
    const { isAdminLoggedIn } = useAdminAuth();
    if (isAdminLoggedIn) {
        return (
            <div className="AddUsersContainer">
                <AdminNavbar />
                <AdminBanner name="Add Users" />
                <div className="AddUserContent">
                    <h2>Add New User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="UserName">
                            <span>User Name</span>
                        </div>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={handlenameInputChange}
                            required
                        />
                        <div className="UserPhone">
                            <span>Phone Number</span>
                        </div>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={handlephoneNumberChange}
                            required
                        />
                        <div className="UserEmail">
                            <span>Email Address</span>
                        </div>
                        <input
                            type="email"
                            value={emailInput}
                            onChange={handleemailInputChange}
                            required
                        />
                        <div className="UserPassword">
                            <span>Password</span>
                        </div>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={handlepasswordInputChange}
                            required
                        />
                        <button type="submit">Add User</button>
                    </form>
                </div>
            </div>

        );
    }
    else return <AdminLoginPage />
};


export default AddUsers;
