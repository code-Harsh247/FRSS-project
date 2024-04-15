import React from "react";
import "./Footer.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo/Logo (black).png";

const Footer = () => {
    
    const navigate = useNavigate();

    const openHomePage=()=>{
        navigate('/');
    }

    return (
        <div className="footerContainer">
            <div className="footerLogo">
                <img src={Logo} alt="The Furniture Co. Logo" onClick={openHomePage} />
                </div>
          
            <div className="list1">
                <ul>
                    <p className="link">Links</p>
                    <li className="footer_home"><a href="#Home">Home</a></li>
                    <li className="footer_shop"><NavLink to="/shop">Shop</NavLink></li>
                    <li className="footer_about"><a href="#AboutUs">About</a></li>
              </ul>
              </div>
              <div className="list2">
                <ul>
                    <p className="help">Help</p>
                    <li className="footer_contact"><a href="#ContactBanner">Contact</a></li>
                    <li className="footer_policy">Privacy Policies</li>
              </ul>
              </div>

        </div>
      );
        
};

export default Footer;
