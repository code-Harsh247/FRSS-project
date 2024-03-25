import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ShopBanner from '../components/ShopBanner/ShopBanner';

const Shop = () => {
    return (
        <div className='container'>
            <Navbar />
            <ShopBanner />
            <Footer />
        </div>
    );
};

export default Shop;
