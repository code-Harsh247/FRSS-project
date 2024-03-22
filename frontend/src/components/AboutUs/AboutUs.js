import React from "react";
import "./AboutUs.css";
import bannerImg from '../assets/images/homepage banner img.jpg'


const AboutUs = () => {
    
    return (
        <div className="aboutUsContainer">
            <div className='wrapper'>
                <div className='banner-container'>
                    <img src={bannerImg} alt='Banner' className='banner-image' />
                    <div className='banner-text-box'>
                        <p className='furniture-text'>About Us</p>
                        <p className='rent-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                       
                    </div>
                </div>
            </div>
            </div>
            
      );
        
};

export default AboutUs;
