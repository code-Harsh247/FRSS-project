import React from "react";
import "./Footer.css";
import Logo from "../assets/Logo/Logo (black).png";
const Footer = () => {
    
    return (
        <div className="footerContainer">
            <div className="footerLogo">
                <img src={Logo} alt="The Furniture Co. Logo" />
                </div>
          
            <div className="list1">
                <ul>
                    <p className="link">Links</p>
                    <li className="footer_home"><a href="#">Home</a></li>
                    <li className="footer_shop"><a href="#">Shop</a></li>
                    <li className="footer_about"><a href="#">About</a></li>
              </ul>
              </div>
              <div className="list2">
                <ul>
                    <p className="help">Help</p>
                    <li className="footer_contact"><a href="#">Contact</a></li>
                    <li className="footer_policy"><a href="#">Privacy Policies</a></li>
              </ul>
              </div>

        </div>
      );
        
};

export default Footer;
