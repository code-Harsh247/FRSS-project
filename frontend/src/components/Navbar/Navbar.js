import React from "react";
import "./Navbar.css";
import logo from "../assets/Logo/Logo (black).png";
import search from "../assets/Icons/search.png";
import cart from "../assets/Icons/shopping-cart.png";
import profile from "../assets/Icons/profile.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
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
                <img src={search} alt="Search" className="search-icon"/>
                <img src={cart} alt="cart" className="cart-icon"/>
                <img src={profile} alt="profile" className="profile-icon"/>
            </div>
        </nav>
    );
};

export default Navbar;
