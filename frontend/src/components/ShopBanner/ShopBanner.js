import React from "react";
import "./ShopBanner.css";
import bannerImg from '../assets/images/img1.jpg'
const ShopBanner = ({name}) => {
    
    return (
        <div className="shopBannerContainer">
            <div className='imgContainer' >
                <img src={bannerImg} alt='Banner' className='banner-image'/>
            </div>
            <div className="shopBannerText">
            <p className="Shop">{name}</p>
            <p>Home &gt; {name}</p>
            </div>
        </div>
      );
        
};

export default ShopBanner;

