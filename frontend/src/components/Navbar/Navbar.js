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
        navigate('/login');
    }

    const handleLogIn=()=>{
        navigate('/login');
    }
    const scrollToAboutSection = () => {
        // First, navigate to the homepage
        navigate('/');
        
        // Scroll down to the About section after a slight delay to ensure navigation completes
        setTimeout(() => {
            const aboutSection = document.getElementById('AboutUs');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const scrollToContactSection = () => {
        // First, navigate to the homepage
        navigate('/');
        
        // Scroll down to the Contact section after a slight delay to ensure navigation completes
        setTimeout(() => {
            const contactSection = document.getElementById('ContactBanner');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const openCartPage=()=>{
        navigate('/cart');
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
                    <NavLink to="/" onClick={scrollToAboutSection}>About</NavLink>
                    <NavLink to="/" onClick={scrollToContactSection}>Contact</NavLink>
                </div>
                <div className="icons">
                    <img src={search} alt="Search" className="search-icon" />
                    <img src={cart} alt="cart" className="cart-icon" onClick={()=>{
                        navigate('/cart');
                    }}/>
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

export default Navbar;
