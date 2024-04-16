import React, { useState, useEffect } from 'react';
import './HistoryProductCard.css';
import axios from "../../context/axiosConfig";

function HistoryProductCard({ img, name, price, quantity, duration, date, timeDue, status, orderId, userId, isDamaged }) {
  const [messageIndex, setMessageIndex] = useState(-1);
  const messages = ["Currently Renting", "Return Request Initiated", "Returned"];
  console.log("Is Damaged :",isDamaged);
  // Use useEffect to set initial messageIndex based on status prop
  useEffect(() => {
    switch (status) {
      case 'active':
        setMessageIndex(0);
        break;
      case 'inactive':
        setMessageIndex(2);
        break;
      case 'pending':
        setMessageIndex(1);
        break;
      default:
        setMessageIndex(-1); // Default message if status is not recognized
    }
  }, [status]); // Run effect when status prop changes

  const handleReturnProduct = async () => {
    try {
      // Make a POST request to create a return request
      const response = await axios.post('admin/create-return-requests', { orderId, userId });

      // Check if the return request was successfully created
      if (response.data.success) {
        setMessageIndex(1);
        alert(`Return request for Product: "${name}" initiated successfully`);

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
        <span className="product-price">
  {timeDue < 0 ? `₹${(price * 1.15).toLocaleString()} / month  {15 % Added)` : `₹${price.toLocaleString()} / month`}
</span>
 
          
          
          
          
          {/* Assuming static rental price */}
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
              <span style={{ color: timeDue < 0 ? "red" : "green" }}><span className='font-Admin-Prod-Card'>Time Due:</span>{messageIndex!==0 ? (messageIndex!==1 ? ("0 day"):("On hold")) : `${timeDue} days`} </span>
            </div>
            <div className='StatusMessage' >
            <span style={{ color: "black" }}><span className='font-Admin-Prod-Card'>Status:</span>{statusMessage}</span>
              <span style={{ color: timeDue < 0 ? "red" : "green" }}>{timeDue < 0 ? "Loan: Active" : "Loan: Inactive"}</span>
            </div>

            {/* {isDamaged && (
              <div className='DamagedProduct'>

              </div>
            ) } */}
          </div>
        </div>
      </div>
      <button className={messageIndex==0 ? "ReturnBtn" : "DisabledBtn"} disabled={messageIndex !== 0} onClick={handleReturnProduct}>{messageIndex!==0 ? (messageIndex!==1 ? ("Returned"):("Pending")) : "Return"}</button>




    </div>
  );
}

export default HistoryProductCard;
