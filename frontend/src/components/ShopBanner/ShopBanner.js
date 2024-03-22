import React from "react";
import "./ShopBanner.css";
import bannerImg from '../assets/images/img1.jpg'
const ShopBanner = () => {
    
    return (
        <div className="shopBannerContainer">
            <div className='imgContainer' >
                <img src={bannerImg} alt='Banner' className='banner-image' z />
            </div>
            <div className="shopBannerText">
            <p className="Shop">Shop</p>
            <p>Home &gt; Shop</p>
            </div>
        </div>
      );
        
};

export default ShopBanner;

