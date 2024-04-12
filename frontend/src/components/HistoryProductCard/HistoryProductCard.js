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
            <span>Quantity:{quantity}</span>
            
          </div>
          <div className='detail'>
            <span>Rent Duration (months):{duration}</span>
           
          </div>
        </div>
      </div>
      {/* Close icon */}
      {/* Note: Since this is a history product card, there's no need for the delete functionality */}
      
    </div>
  );
}

export default HistoryProductCard;
