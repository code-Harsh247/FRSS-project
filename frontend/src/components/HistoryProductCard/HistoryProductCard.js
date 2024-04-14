import React from 'react';
import './HistoryProductCard.css';
import closeicon from '../assets/Icons/close.png';

function HistoryProductCard({ img, name, price, quantity, duration }) {

  return (
    <div className="history-product-card">
      
      <div className='product-image-container'>
        <img
          className="product-image"
          src={img} // Assuming you have an imageUrl property
          alt={name}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <span className="product-price">
          ₹{(price * quantity * duration).toLocaleString()} {/* Assuming static rental price */}
        </span>
        <div className="product-details">
          <div className='detail'>
            <span style={{color:"black"}}><span className='font-Admin-Prod-Card'>Quantity:</span>{quantity}</span>
            <br/>
            <span style={{color:"black"}}><span className='font-Admin-Prod-Card'>Rent Duration (months):</span>{duration}</span>
          </div>
        </div>
      </div>
      <button className='ReturnBtn'>Return</button>
      {/* Close icon */}
      {/* Note: Since this is a history product card, there's no need for the delete functionality */}
      
    </div>
  );
}

export default HistoryProductCard;
