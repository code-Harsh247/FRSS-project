import React from 'react'
import Navbar from '../components/Navbar/Navbar';
// import BRsection from '../components/BrowseRangeSection/BRsection';
// import bannerImg from '../components/assets/images/homepage banner img.jpg'
// import CustomButton from '../components/Button/CustomButton';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import "../pages/Css/Shop.css"
// import AboutUs from '../components/AboutUs/AboutUs';
import ShopBanner from '../components/ShopBanner/ShopBanner';
import ProductCard from '../components/productCard/productCard';
import testImg from '../components/assets/images/chair.jpg'


const Shop = () => {

    const navigate = useNavigate();
    const goToHome = ()=>{
        navigate('/');
    }

    return (
        <div className='Shop-Container'>
            
                <Navbar />
                <ShopBanner/>
                <ProductCard imageUrl={testImg} productName="chair" price="10000"/>
                <Footer/>
   
        </div>
        
    )
}

export default Shop;
