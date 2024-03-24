import React from 'react';
import './ProductCard.css';

function Card({ imageUrl, productName, price }) {
  return (
    <div className="ShopProductCard">
      <img src={imageUrl} alt={productName} />
      <div className="card-content">
        <h3 className="card-title">{productName}</h3>
        <p className="card-text">
          <br />
          ${price}
          <br />
          Contract Grade
        </p>
      </div>
    </div>
  );
}

export default Card;
