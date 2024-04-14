import React, { useState, useEffect } from 'react';
import './CartItem.css';
import closeicon from '../assets/Icons/close.png';
import Counter from '../Counter/Counter2';
import axios from "../../context/axiosConfig";
import { useCart } from '../../context/CartContext';

function CartItem({ img, name, price, q, d, deleteItem, ID }) {
  const [quantity, setQuantity] = useState(q);
  const [duration, setDuration] = useState(d);
  const { setCacheCart, cartData, userId } = useCart();

  useEffect(() => {
    const updateCartItem = async () => {
      try {
        // Prepare the updated cart item data
        const updatedCartItem = {
          id: ID, // Assuming you have an ID for each cart item
          count: quantity,
          duration: duration,
        };

        // Make the HTTP PUT request to update cart item data
        await axios.put(`users/update-cart/${userId}`, {
          cartItem: updatedCartItem,
        });
        

      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    };

    // Call the updateCartItem function whenever quantity or duration changes
    updateCartItem();
  }, [quantity, duration]); // Include all dependencies in the dependency array






  return (
    <div className="cartitemcontainer">
      <div className='CartItemImageContainer'>
        <img
          className="cart-item-image"
          src={img} // Assuming you have an imageUrl property
          alt={name}
        />
      </div>
      <div className="cartiteminfo">
        <h3 className="cartitemname">{name}</h3>
        <span className="cartitemprice">
          ₹{(price * quantity).toLocaleString()}/month
        </span>
        <div className="cartitemquantity">
          <div className='QuantityAndDuration'>
            <div className='duration'>
              <span>Rent Duration (months)</span>
              <Counter valueFunc={setDuration} defaultValue={duration} />
            </div>
            <div className="quantity">
              <span>Quantity</span>
              <Counter valueFunc={setQuantity} defaultValue={quantity} />
            </div>
          </div>
        </div>
      </div>
      <div className="closeicon" onClick={deleteItem}>
        <img src={closeicon} alt="close" />
      </div>
    </div>
  );
}

export default CartItem;
