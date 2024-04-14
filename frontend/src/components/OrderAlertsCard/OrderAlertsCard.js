import React from "react";
import './OrderAlertsCard.css'; // Import the CSS file for styling

function OrderAlertsCard({  productId, userName, userId, duration, price, quantity, image }) {
    return ( 
        <div className='OrderAlertsCardContainer'>
            <div className='OrderAlertsCardImageContainer'>
                <img
                    className="order-alerts-card-image"
                    src={image}
                    
                />
            </div>
            <div className="order-alerts-card-info">
               
                <p>Product ID: {productId}</p>
                <p>User Name: {userName}</p>
                <p>User ID: {userId}</p>
                <p>Months Rented: {duration}</p>
                <p>Price: ₹{price}</p>
                <p>Quantity: {quantity}</p>
            </div>
        </div>
     );
}

export default OrderAlertsCard;
