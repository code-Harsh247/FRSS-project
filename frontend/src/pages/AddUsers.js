import React, { useState } from "react";
import "./Css/AddUsers.css";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";


const AddUsers = () => {
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleUserPhoneChange = (e) => {
        setUserPhone(e.target.value);
    };

    const handleUserEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    const handleUserPasswordChange = (e) => {
        setUserPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            name: userName,
            phone: userPhone,
            email: userEmail,
            password: userPassword,
        });

        setUserName("");
        setUserPhone("");
        setUserEmail("");
        setUserPassword("");
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
                            value={userName}
                            onChange={handleUserNameChange}
                            required
                        />
                        <div className="UserPhone">
                            <span>Phone Number</span>
                        </div>
                        <input
                            type="text"
                            value={userPhone}
                            onChange={handleUserPhoneChange}
                            required
                        />
                        <div className="UserEmail">
                            <span>Email Address</span>
                        </div>
                        <input
                            type="email"
                            value={userEmail}
                            onChange={handleUserEmailChange}
                            required
                        />
                        <div className="UserPassword">
                            <span>Password</span>
                        </div>
                        <input
                            type="password"
                            value={userPassword}
                            onChange={handleUserPasswordChange}
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
