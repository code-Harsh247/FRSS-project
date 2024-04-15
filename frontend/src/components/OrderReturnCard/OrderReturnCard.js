import React from "react";
import './OrderReturnCard.css'; // Import the CSS file for styling
import image from '../assets/images/img1.jpg'; // Import the image for the product
function OrderReturnCard({ productId, userName, userId, duration, price, quantity, name, country, address, city, province, zipCode, phone }) {
    return ( 
        <div className='OrderReturnCardContainer'>
            <div className='OrderReturnCardImageContainer'>
                <img
                    className="order-return-card-image"
                    src={image}
                    alt="Product"
                />
            </div>
            <div className="order-return-card-info">
                <p className="font-Admin-Prod-Card">Product ID: {productId}</p>
                <p className="font-Admin-Prod-Card">User Name: {userName}</p>
                <p className="font-Admin-Prod-Card">User ID: {userId}</p>
                <p className="font-Admin-Prod-Card">Months Rented: {duration}</p>
                <p className="font-Admin-Prod-Card">Price: ₹{price}</p>
                <p className="font-Admin-Prod-Card">Quantity: {quantity}</p>
                {/* Additional details hidden by default */}
                <div className="additional-details">
                    <p className="font-Admin-Prod-Card">Name: {name}</p>
                    <p className="font-Admin-Prod-Card">Country: {country}</p>
                    <p className="font-Admin-Prod-Card">Address: {address}</p>
                    <p className="font-Admin-Prod-Card">City: {city}</p>
                    <p className="font-Admin-Prod-Card">Province: {province}</p>
                    <p className="font-Admin-Prod-Card">Zip Code: {zipCode}</p>
                    <p className="font-Admin-Prod-Card">Phone: {phone}</p>
                </div>
            </div>
        </div>
     );
}

export default OrderReturnCard;
