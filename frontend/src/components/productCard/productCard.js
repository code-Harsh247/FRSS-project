import React from 'react';
import './ProductCard.css';

const ProductCard = ({imgURL, title, price}) => {
    
    return (
        <div className="card">
            <div className="image">
                
                    <img src={imgURL}/>
                
            </div>
        <span className="title">
            {title}
        </span>
        <span className="price">
            {price}
        </span>
        </div>
    );
}
export default ProductCard;