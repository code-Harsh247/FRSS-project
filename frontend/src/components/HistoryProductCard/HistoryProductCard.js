import React from 'react';
import './HistoryProductCard.css';
import axios from "../../context/axiosConfig";
import closeicon from '../assets/Icons/close.png';

function HistoryProductCard({ img, name, price, quantity, duration, date, timeDue, status, orderId, userId }) {
  let messageIndex;
  const messages = ["Currently Renting", "Return Request Initiated", "Returned"];
  switch (status) {
    case 'active':
      messageIndex = 0;
      break;
    case 'inactive':
      messageIndex = 2;
      break;
    case 'pending':
      messageIndex = 1;
      break;
    default:
      messageIndex = -1; // Default message if status is not recognized
  }
  const handleReturnProduct = async () => {
    try {
      // Make a POST request to create a return request
      const response = await axios.post('admin/create-return-requests', { orderId, userId });

      // Check if the return request was successfully created
      if (response.data.success) {
        alert(`Return request for Product: "${name}" initiated successfully`);
        messageIndex = 1;
      } else {
        alert('Failed to initiate return request');
      }
    } catch (error) {
      console.error('Error initiating return request:', error);
      alert('Failed to initiate return request');
    }
  };



  const statusMessage = messages[messageIndex];

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
          ₹{(price).toLocaleString()} /month {/* Assuming static rental price */}
        </span>
        <div className="product-details">
          <div className='detail'>
            <div>
              <span style={{ color: "black" }}><span className='font-Admin-Prod-Card'>Quantity:</span>{quantity}</span>
              <br />
              <span style={{ color: "black" }}><span className='font-Admin-Prod-Card'>Rent Duration (months):</span>{duration}</span>
            </div>
            <div>
              <span style={{ color: "black" }}><span className='font-Admin-Prod-Card'>Date Ordered:</span>{date}</span>
              <br />
              <span style={{ color: timeDue < 0 ? "red" : "green" }}><span className='font-Admin-Prod-Card'>Time Due:</span>{timeDue}</span>
            </div>
            <div className='StatusMessage'>
              <span className='font-Admin-Prod-Card'>Status:</span>{statusMessage}
            </div>

          </div>
        </div>
      </div>
      <button className='ReturnBtn' onClick={handleReturnProduct}>Return</button>

    </div>
  );
}

export default HistoryProductCard;
