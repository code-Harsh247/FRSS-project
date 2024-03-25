import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ShopBanner from '../components/ShopBanner/ShopBanner';
import ServiceBanner from '../components/ServiceBanner/ServiceBanner'

const Shop = () => {
    return (
        <div className='container'>
            <Navbar />
            <ShopBanner />
            <ServiceBanner/>
            <Footer />
        </div>
    );
};

export default Shop;
