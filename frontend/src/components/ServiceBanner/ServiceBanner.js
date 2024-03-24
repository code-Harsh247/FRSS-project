import React from 'react';

function Card() {
  return (
    <div className="card">
      <div className="card-image">
        <div className="card-icons">
        <ul>
            <li>
                <img src='https://img.icons8.com/ios/452/checked--v1.png' alt='checked icon'/>
                <p className='servicetitle'>High Quality</p>
                <p>Crafted from top materials</p>
            </li>
            <li>
                <img src='https://img.icons8.com/ios/452/checked--v1.png' alt='checked icon'/>
                <p className='servicetitle'>Warranty Protection</p>
                <p>Over 2 Years Warranty</p>
            </li>
            <li>
                <img src='https://img.icons8.com/ios/452/checked--v1.png' alt='checked icon'/>
                <p className='servicetitle'>Warranty Protection</p>
                <p>Over 2 Years Warranty</p>
            </li>
            <li>
                <img src='https://img.icons8.com/ios/452/checked--v1.png' alt='checked icon'/>
                <p className='servicetitle'>Warranty Protection</p>
                <p>Over 2 Years Warranty</p>
            </li>
        </ul>
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
