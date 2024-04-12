import React from "react";
import "./ShopBanner.css";
import bannerImg from '../assets/images/img2.jpg';

const ShopBanner = ({ name }) => {
    return (
        <div className="shopBannerContainer">
            <div className='imgContainer'>
                <img src={bannerImg} alt='Banner' className='banner-image'/>
            </div>
            <div className="shopBannerText">
                <p className="Shop">{name}</p>
                {name !== "Shop" ? <p>Home &gt; Shop &gt; {name}</p> : <p>Home &gt; Shop</p>}
            </div>
        </div>
    );
};

export default ShopBanner;
