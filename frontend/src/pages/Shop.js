import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import BRsection from '../components/BrowseRangeSection/BRsection';
import bannerImg from '../components/assets/images/homepage banner img.jpg'
import CustomButton from '../components/Button/CustomButton';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AboutUs from '../components/AboutUs/AboutUs';
import ShopBanner from '../components/ShopBanner/ShopBanner';
import ServiceBanner from '../components/ServiceBanner/ServiceBanner';
// import ProductCard from '../components/ProductCard/ProductCard';

const Shop = () => {

    const navigate = useNavigate();

    const goToShop = ()=>{
        navigate('/shop');
    }

    return (
        <div className='container'>
            
                {/* <Navbar />
                <ShopBanner/>
            <Footer/> */}
            <ServiceBanner />
   
        </div>
        
    )
}

export default Shop;
