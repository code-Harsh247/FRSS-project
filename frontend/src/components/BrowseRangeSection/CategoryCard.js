import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({imgURL, title}) => {
    return (
        <div className='BRsec-Category-Card-Container'>
                <div className='Category-img'>
                    <img src={imgURL} alt={title}></img>
                <div/>
            </div>
            <p className='category-title'>{title}</p>
        </div>

    );
};

export default CategoryCard;

