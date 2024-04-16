import React from "react";
import "./InventoryNotificationCard.css";

function InventoryNotificationCard({ productName, productId, imageUrl, quantity, prodName }) {
  return (
    <div className="InventoryNotificationCardContainer">
      <div className="inventory-notification-card-image">
        <img
          className="inventory-notification-card-img"
          src={imageUrl}
          alt={productName}
        />
      </div>
      <div className="inventory-notification-card-info">
        <h3 className="itemname">{prodName}</h3>
        <span><span className='font-Admin-Prod-Card'>ProductID : </span>{productId}</span>
        <br />
        <span><span className='font-Admin-Prod-Card'>Quantity : </span>{quantity}</span>
        <p className="inventory-notification-card-message">LOW INVENTORY!</p>
      </div>
    </div>
  );
}

export default InventoryNotificationCard;
