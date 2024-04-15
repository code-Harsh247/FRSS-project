import React, { useEffect, useState, useRef } from "react";
import "./AdminNavbar.css";
import logo from "../assets/Logo/Logo (black).png";
import profile from "../assets/Icons/profile.png";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import reddot from "../assets/Icons/bin.png";


const AdminNavbar = ({alert}) => {
    const [profileListVisibility, setProfileListVisibility] = useState(false);
    const [logoutBoxPosition, setLogoutBoxPosition] = useState({ top: 0, left: 0 });
    const profileIconRef = useRef(null);
    const navigate = useNavigate();

    const { isAdminLoggedIn, adminLogin, adminLogout } = useAdminAuth();

    const handleProfileClick = (event) => {
        event.stopPropagation();
        console.log("is")
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
        adminLogout();
        localStorage.removeItem('AdminToken');
        navigate('/admin');
    }

    const handleLogIn=()=>{
        navigate('/admin');
    }
    const openDashboard=()=>{  
        navigate('/admin/dashboard');
     }

    return (
        <>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Company Logo" className="navbar-logo" onClick={openDashboard} />
                </div>
                <div className="links">


                    <NavLink to="/admin/dashboard" >Dashboard</NavLink>
                    <NavLink to="/admin/users">Users</NavLink>
                    <NavLink to="/admin/products">Products</NavLink>
                    {alert && (
                        <div className="AlertsDot">
                          
                        </div>
                    )}
                    <NavLink to="/admin/alerts">Alerts</NavLink>
                   
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
                    {isAdminLoggedIn? (
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
