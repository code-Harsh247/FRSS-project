import React from 'react';
import './productCard.css';

function ProductCard({ imageUrl, productName, price }) {
  return (
    <div className="ShopProductCard">
      <img src={imageUrl} alt={productName} />
      <div className="card-content">
        <h3 className="card-title">{productName}</h3>
        <p className="card-text">
          ${price}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
