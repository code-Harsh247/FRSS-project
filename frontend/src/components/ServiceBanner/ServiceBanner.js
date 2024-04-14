import React from 'react';
import './ServiceBanner.css';
import trophy from '../assets/Icons/trophy.png';
import guarantee from '../assets/Icons/guarantee.png';
import shipping from '../assets/Icons/shipping.png';
import customer from '../assets/Icons/customer.png';

function ServiceBanner() {
    return (
        <div className="ServiceBannerContainer">



            <div className='Service'>
                    <img src={trophy} alt='trophy'/>
                <p className='servicetitle'>High Quality</p>
                <p>Crafted from top materials</p>
            </div>


            <div className='Service'>
                <img src={guarantee} alt='guarantee' />
                <p className='servicetitle'>Warranty Protection</p>
                <p>Over 2 Years Warranty</p>
            </div>


            <div className='Service'>
                <img src={shipping} alt='shipping' />
                <p className='servicetitle'>
                    Free Shipping</p>
                <p> Order over 2 products</p>

            </div>


            <div className='Service'>
                <img src={customer} alt='customer service' />
                <p className='servicetitle'>24 / 7 Support</p>
                <p>Dedicated support</p>
            </div>



        </div>
    );
}

export default ServiceBanner;
