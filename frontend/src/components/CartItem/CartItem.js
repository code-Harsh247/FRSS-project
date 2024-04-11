import React, { useState } from 'react';
import './CartItem.css';
import closeicon from '../assets/Icons/close.png';
import Counter from '../Counter/Counter2';

function CartItem({ img, name, price, q, d }) {

  const [quantity, setQuantity] = useState(q);
  const [duration, setDuration] = useState(d);




  const deleteItem = () => {
    console.log('delete item');
  }

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
