import React from "react";
import bannerImg from '../assets/images/img2.jpg';

const AdminBanner = ({ name }) => {
    return (
        <div className="shopBannerContainer">
            <div className='imgContainer'>
                <img src={bannerImg} alt='Banner' className='banner-image'/>
            </div>
            <div className="shopBannerText">
                <p className="Shop">{name}</p>  
            </div>
        </div>
    );
};

export default AdminBanner;
