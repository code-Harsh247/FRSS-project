import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ id,imageUrl, productName, price ,availability}) {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(`/product/${id}`);
  }
  return (
    <div className="ShopProductCard"  onClick={handleClick}>
      <img src={imageUrl} alt={productName} />
      <div className="card-content">
        <div className='title-rating'>
        <h3 className="card-title">{productName}</h3>
        
        </div>
        
        <p className="card-text">
          Rs {price}/month
        </p>
        <div className="availability">
          {availability ? '' : 'Out of Stock'}
          </div>
      </div>
    </div>
  );
}

export default ProductCard;
