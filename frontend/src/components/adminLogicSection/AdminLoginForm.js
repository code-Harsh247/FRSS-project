import React, { useState } from "react";
import "./AdminLoginForm.css"
import "../assets/fonts/fonts.css"
import hideIcon from "../assets/Icons/hide.png"
import viewIcon from "../assets/Icons/view.png"
import InputBox from "../InputBox/InputBox";
import CustomButton from "../Button/CustomButton";



const AdminLoginForm = () => {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
        console.log("Email : ", emailInput);
        console.log("Password : ", passwordInput);
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