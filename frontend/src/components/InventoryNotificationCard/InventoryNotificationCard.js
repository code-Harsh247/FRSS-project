import React from "react";
import "./InventoryNotificationCard.css";

function InventoryNotificationCard({ productName, productId, imageUrl, quantity }) {
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
        <h3 className="inventory-notification-card-name">{productName}</h3>
        <p className="inventory-notification-card-id">Product ID: {productId}</p>
        <p className="inventory-notification-card-quantity">Quantity: {quantity}</p>
        <p className="inventory-notification-card-message">LOW INVENTORY!</p>
      </div>
    </div>
  );
}

export default InventoryNotificationCard;
