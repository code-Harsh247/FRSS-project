import React, { useState } from "react";
import "../signupSection/SignupForm.css"
import "../assets/fonts/fonts.css"
import hideIcon from "../assets/Icons/hide.png"
import viewIcon from "../assets/Icons/view.png"
import InputBox from "../InputBox/InputBox";
import CustomButton from "../Button/CustomButton";
import axios from "../../context/axiosConfig";

import { NavLink, useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [nameInput,setNameInput]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleNameChange=(fullName)=>{
        setNameInput(fullName);
    };
    const handlePhoneNumber=(phone)=>{
        setPhoneNumber(phone);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (email) => {
        setEmailInput(email);
    }
    const handlePasswordChange = (password) => {
        setPasswordInput(password);
    }

    const navigate = useNavigate();
    const handleButtonClick = async (event) => {
        event.preventDefault();  //Prevents page refresh when button is clicked. (Happens when button is inside a form element)
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
                alert('Signup successful. Please login.');
                const token = response.data.token; // Access token from response data
                localStorage.setItem('token', token);
                navigate('/login');
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
    
    
    


    return (
        <div className="Container">
            <div className="SignUpSectionContainer">
                <div className="FormContainer">
                    <form>
                        <div className="SignUpHeader">
                            <p>Sign Up</p>
                            <span>Signup to your account to access our products</span>
                        </div>
                        <div className="Name">
                            <span> Name</span>
                            <InputBox onInputChange={handleNameChange} autocomplete="name" />
                        </div>
                        <div className="Phone">
                            <span> Phone</span>
                            <InputBox onInputChange={handlePhoneNumber} autocomplete="phone" />
                        </div>
                        <div className="Email">
                            <span> Email Address</span>
                            <InputBox onInputChange={handleEmailChange} autocomplete="email" />
                        </div>
                        <div className="Password">
                            <div><span> Password</span>
                                <img
                                    src={showPassword ? viewIcon : hideIcon}
                                    alt={showPassword ? "Hide" : "Show"}
                                    className="toggle-password-button"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                            <InputBox onInputChange={handlePasswordChange} type={showPassword ? "text" : "password"} autocomplete="current-password" />
                        </div>
                        <div className="SignUpBtn">
                            <CustomButton btnText="Sign up" handleClick={handleButtonClick} Btnwidth="8.5em" />
                        </div>
                        <div className="signupLink">
                            <span style={{ color: "black" }}>Already have an account? </span>
                            <NavLink className="SignUpPageLink" to="/login">Login</NavLink>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default SignupForm;