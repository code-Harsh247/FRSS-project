import React from 'react';
import './ProductCard.css';
function Card() {
  return (
    <div className="ShopProductCard">
      <img src="https://cdn.pixelspray.io/v2/black-bread-289bfa/Zu3Ns5/wrkr/t.resize(h:450,w:500)/data/pottery-barn/24062022img/7911181_2.jpg" alt="Pottery Barn Balboa Upholstered Swivel Armchair" />
      <div className="card-content">
        <h3 className="card-title">Balboa Upholstered Swivel Armchair</h3>
        <p className="card-text">
          <br />
          $1000.00
          <br />
          Contract Grade
        </p>
      </div>
    </div>
  );
}

export default Card;
