import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({imgURL}) => {
    return (
        <div className='BRsec-Category-Card-Container'>
            <div className='BRsec-Category-Card'>
                <div className='Category-img'>
                    <img src={imgURL} alt="category"></img>
                </div>
            </div>
        </div>

    );
};

export default CategoryCard;

