import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import bannerImg from '../components/assets/images/homepage banner img.jpg'
import "./Css/HomePage.css"
import CustomButton from '../components/Button/CustomButton';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer/Footer";

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

            <div className='browse'></div>
        </div>
        
    )
}

export default HomePage;
