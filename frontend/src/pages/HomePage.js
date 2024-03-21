import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import BRsection from '../components/BrowseRangeSection/BRsection';
import bannerImg from '../components/assets/images/homepage banner img.jpg'
import "./Css/HomePage.css"
import CustomButton from '../components/Button/CustomButton';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    const goToShop = ()=>{
        navigate('/shop');
    }

    return (
        <div className='container'>
            <div className='wrapper'>
                <Navbar />
                <div className='banner-container'>
                    <img src={bannerImg} alt='Banner' className='banner-image' />
                    <div className='banner-text-box'>
                        <p className='furniture-text'>Furniture as unique as you</p>
                        <p className='rent-text'>Rent your signature style today at the most affordable prices!</p>
                        <div><CustomButton btnText="Buy Now" handleClick={goToShop}></CustomButton></div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
            <BRsection/>
=======

            <div className='browse'></div>     
>>>>>>> 5be24e477c65010cc573883146ea07b530794510
        </div>
        
    )
}

export default HomePage;
