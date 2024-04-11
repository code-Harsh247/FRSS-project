import React from "react";
import './OrderAlertsCard.css'; // Import the CSS file for styling

function OrderAlertsCard({ productName, productId, userName, userId, monthsRented, price, quantity, productImage }) {
    return ( 
        <div className='OrderAlertsCardContainer'>
            <div className='OrderAlertsCardImageContainer'>
                <img
                    className="order-alerts-card-image"
                    src={productImage}
                    alt={productName}
                />
            </div>
            <div className="order-alerts-card-info">
                <h3 className="order-alerts-card-name">{productName}</h3>
                <p>Product ID: {productId}</p>
                <p>User Name: {userName}</p>
                <p>User ID: {userId}</p>
                <p>Months Rented: {monthsRented}</p>
                <p>Price: ₹{(price * quantity).toLocaleString()}</p>
                <p>Quantity: {quantity}</p>
            </div>
        </div>
     );
}

export default OrderAlertsCard;
