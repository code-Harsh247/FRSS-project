import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import BRsection from '../components/BrowseRangeSection/BRsection';
import bannerImg from '../components/assets/images/homepage banner img.jpg'
import "./Css/HomePage.css"
import CustomButton from '../components/Button/CustomButton';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import ContactBanner from '../components/ContactBanner/ContactBanner';
import AboutUs from '../components/AboutUs/AboutUs';
import ReviewStar from '../components/ReviewStar/ReviewStar';
import CheckOut from '../components/CheckOut/CheckOut';

const HomePage = () => {

    const navigate = useNavigate();

    const goToShop = ()=>{
        navigate('/shop');
    }

    return (
        <div className='container' id='Home'>
            {/* <div className='wrapper'>
                <Navbar />
                <div className='banner-container'>
                    <img src={bannerImg} alt='Banner' className='banner-image' />
                    <div className='banner-text-box'>
                        <p className='furniture-text'>Furniture as unique as you</p>
                        <p className='rent-text'>Rent your signature style today at the most affordable prices!</p>
                        <div><CustomButton btnText="Buy Now" handleClick={goToShop} Btnwidth="8.5em"></CustomButton></div>
                    </div>
                </div>
            </div> */}
            {/* <ReviewStar/> */}
            {/* <BRsection/>
            <AboutUs/>
            <ContactBanner/>
            <Footer/> */}
    <CheckOut/>
        </div>
        
    )
}

export default HomePage;
