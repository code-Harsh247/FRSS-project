import React, { useState } from "react";
import axios from "../../context/axiosConfig";
import "./AdminLoginForm.css"
import "../assets/fonts/fonts.css"
import hideIcon from "../assets/Icons/hide.png"
import viewIcon from "../assets/Icons/view.png"
import InputBox from "../InputBox/InputBox";
import CustomButton from "../Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminLoginForm = () => {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {adminLogin, isAdminLoggedIn } = useAdminAuth();

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (email) => {
        setEmailInput(email);
    }
    const handlePasswordChange = (password) => {
        setPasswordInput(password);
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();     
        try {
            console.log(emailInput);
            console.log(passwordInput);
            // Send a request to the backend to authenticate the admin
            const response = await axios.post('/admin/login', {
                email: emailInput,
                password: passwordInput
            });
            console.log(response.data.success);
            if (response.data.success) {
                // Login successful
                const token = response.data.token;
                localStorage.setItem('AdminToken', token); // Store token in local storage
                adminLogin(); // <-- Corrected function call
                navigate('/admin/dashboard'); // Redirect to dashboard or any other page
            } 
        } catch (error) {
            alert(`Error: ${error.response.data.errors}`)
        }
    };

    return (
        <div className="Container">
            <div className="LoginSectionContainer">
                <div className="FormContainer">
                    <form>
                        <div className="LoginHeader">
                            <p>Admin Login</p>
                            <span>Login to monitor and manage backend</span>
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
                        <div className="LoginBtn">
                            <CustomButton btnText="Log in" handleClick={handleButtonClick} Btnwidth="8.5em"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLoginForm;
