import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ShopBanner from '../components/ShopBanner/ShopBanner';
import ServiceBanner from '../components/ServiceBanner/ServiceBanner';
import BRsection from '../components/BrowseRangeSection/BRsection';
import MostRented from '../components/MostRented/MostRented';


const Shop = () => {
    return (
        <div className='container'>
            <Navbar />
            <ShopBanner />
            <BRsection/>
            <MostRented/>
            <ServiceBanner />
            <Footer />
        </div>
    );
};

export default Shop;
