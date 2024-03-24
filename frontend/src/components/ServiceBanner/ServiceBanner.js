import React from 'react';

function Card() {
  return (
    <div className="card">
      <div className="card-image">
        <div className="card-icons">
        <img src="https://www.flaticon.com/free-icons/trophy" title="trophy icons"></img> {/* Replace with actual icons */}
          <i className="fas fa-shield-alt"></i> {/* Replace with actual icons */}
          <i className="fas fa-shipping-fast"></i> {/* Replace with actual icons */}
          <i className="fas fa-headset"></i> {/* Replace with actual icons */}
        </div>
      </div>
      <div className="card-content">
        <p className="card-text">
          High Quality <br />
          Crafted from Top Materials <br />
          <br />
          Warranty Protection <br />
          Over 2 Years Warranty <br />
          <br />
          Free Shipping
        </p>
      </div>
    </div>
  );
}

export default Card;
