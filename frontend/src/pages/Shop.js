import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ShopBanner from '../components/ShopBanner/ShopBanner';
import ServiceBanner from '../components/ServiceBanner/ServiceBanner'
import ShopCategoryBanner from '../components/ShopCategoryBanner/ShopCategoryBanner';

const Shop = () => {
    return (
        <div className='container'>
            <Navbar />
            <ShopBanner />
            <ShopCategoryBanner/>
            <ServiceBanner/>
            <Footer />
        </div>
    );
};

export default Shop;
