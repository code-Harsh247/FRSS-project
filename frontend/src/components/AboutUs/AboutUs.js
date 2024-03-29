import React from "react";
import "./AboutUs.css";
import bannerImg from '../assets/images/aboutUsImg.jpg'


const AboutUs = () => {

    return (
        <div className="aboutUsContainer" id="AboutUs">
            <div className='wrapper'>
                <div className='banner-container'>
                    <img src={bannerImg} alt='Banner' className='banner-image' />
                    <div className='banner-text-box'>
                        <p className='furniture-text'>About Us</p>
                        <p className='rent-text'>
                            Welcome to our Furniture Rental Store System! We're a team of three computer science students from IIT Kharagpur: Hemant, Harsh Chattar, and Abhinav Kumar Singh. Our goal with this project is to simplify furniture rental for everyone. We believe in making quality furniture accessible to all, whether it's for temporary living arrangements, special events, or simply trying out new styles. </p>

                    </div>
                </div>
            </div>
        </div>

    );

};

export default AboutUs;
