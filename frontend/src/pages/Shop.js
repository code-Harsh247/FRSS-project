import React from 'react'
import Navbar from '../components/Navbar/Navbar';
// import BRsection from '../components/BrowseRangeSection/BRsection';
// import bannerImg from '../components/assets/images/homepage banner img.jpg'
// import CustomButton from '../components/Button/CustomButton';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
// import AboutUs from '../components/AboutUs/AboutUs';
import ShopBanner from '../components/ShopBanner/ShopBanner';
import ServiceBanner from '../components/ServiceBanner/ServiceBanner';

const Shop = () => {

    const navigate = useNavigate();
    const goToHome = ()=>{
        navigate('/');
    }

    return (
        <div className='Shop-Container'>
            
                {/* <Navbar />
                <ShopBanner/>

            <Footer/> */}
            <ServiceBanner/>
   
        </div>
        
    )
}

export default Shop;
