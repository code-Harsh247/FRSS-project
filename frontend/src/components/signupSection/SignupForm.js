import React, { useState } from "react";
import "../signupSection/SignupForm.css"
import "../assets/fonts/fonts.css"
import hideIcon from "../assets/Icons/hide.png"
import viewIcon from "../assets/Icons/view.png"
import InputBox from "../InputBox/InputBox";
import CustomButton from "../Button/CustomButton";

import { NavLink } from "react-router-dom";

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

    const handleButtonClick = (event) => {
        event.preventDefault();  //Prevents page refresh when button is clicked. (Happens when button is inside a form element)
        console.log("Name:", nameInput);
        console.log("Phone:",phoneNumber);
        console.log("Email : ", emailInput);
        console.log("Password : ", passwordInput);
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