import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/Logo/Logo (black).png";
import search from "../assets/Icons/search.png";
import cart from "../assets/Icons/shopping-cart.png";
import profile from "../assets/Icons/profile.png";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [profileListVisibility, setProfileListVisibility] = useState(false);
    const [logoutBoxPosition, setLogoutBoxPosition] = useState({ top: 0, left: 0 });
    const profileIconRef = useRef(null);
    const navigate = useNavigate();

    const { isLoggedIn, login, logout } = useAuth();

    const handleProfileClick = (event) => {
        event.stopPropagation();
        const iconRect = profileIconRef.current.getBoundingClientRect();
        setLogoutBoxPosition({
            top: iconRect.bottom + window.scrollY + 25,
            left: iconRect.left -60+ window.scrollX - (150 - iconRect.width) / 2, // Assuming the box width is 150px
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
        localStorage.removeItem('token');
        navigate('/login');
    }

    const handleLogIn=()=>{
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Company Logo" className="navbar-logo" />
                </div>
                <div className="links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                    <a href="#AboutUs">About</a>
                    <a href="#ContactBanner">Contact</a>
                </div>
                <div className="icons">
                    <img src={search} alt="Search" className="search-icon" />
                    <img src={cart} alt="cart" className="cart-icon" />
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
                        <button onClick={handleLogOut}>Logout</button>
                    ):(
                        <button onClick={handleLogIn}>LogIn</button>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar;
