import React, { useEffect, useState, useRef } from "react";
import "./AdminNavbar.css";
import logo from "../assets/Logo/Logo (black).png";
import profile from "../assets/Icons/profile.png";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const [profileListVisibility, setProfileListVisibility] = useState(false);
    const [logoutBoxPosition, setLogoutBoxPosition] = useState({ top: 0, left: 0 });
    const profileIconRef = useRef(null);
    const navigate = useNavigate();

    const { isLoggedIn, login, logout } = useAuth();
    console.log(isLoggedIn);

    const handleProfileClick = (event) => {
        event.stopPropagation();
        const iconRect = profileIconRef.current.getBoundingClientRect();
        setLogoutBoxPosition({
            top: iconRect.bottom + window.scrollY + 25,
            left: iconRect.left -60+ window.scrollX - (150 - iconRect.width) / 2, 
        });
        setProfileListVisibility((prevVisibility) => !prevVisibility);
    };

    useEffect(() => {
        const handleDocumentClick = () => {
            setProfileListVisibility(false);
        };

        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleLogOut = ()=>{
        logout();
        localStorage.removeItem('token');
        navigate('/admin');
    }

    const handleLogIn=()=>{
        navigate('/admin');
    }


    return (
        <>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Company Logo" className="navbar-logo" />
                </div>
                <div className="links">
                    <NavLink to="/admindashboard" >Dashboard</NavLink>
                    <NavLink to="/products">Products</NavLink>
                    <NavLink to="/users">Users</NavLink>
                   
                </div>
                <div className="AdminNavbarIcons">
                    <div ref={profileIconRef} className="profile-icon-container" onClick={handleProfileClick}>
                        <img src={profile} alt="profile" className="profile-icon" />
                    </div>
                </div>
            </nav>
            {profileListVisibility && (
                <div
                    className="logout-box"
                    style={{
                        position: 'absolute',
                        top: `${logoutBoxPosition.top}px`,
                        left: `${logoutBoxPosition.left}px`,
                    }}
                >
                    {isLoggedIn? (
                        <button onClick={handleLogOut}>Log Out</button>
                    ):(
                        <button onClick={handleLogIn}>Log In</button>
                    )}
                </div>
            )}
        </>
    );
};

export default AdminNavbar;
