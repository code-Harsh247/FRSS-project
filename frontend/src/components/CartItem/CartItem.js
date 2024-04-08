import React, { useState } from 'react';
import './CartItem.css';
import closeicon from '../assets/Icons/close.png';

function CartItem({img,name,price, q }) {


  const deleteItem=()=>{
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
          ₹{(price * q).toLocaleString()}/month
        </span>
        <div className="cartitemquantity">
          <div className="quantity">
<<<<<<< HEAD
            <Counter/>
=======
            <div className="counter">
              
            </div>
>>>>>>> 1c3962e94e570142cd8bf4b58847c34d9bc2985a
          </div>
        </div>
      </div>
      <div className="closeicon" onClick={deleteItem}>
        <img src={closeicon} alt="close"/>
      </div>
    </div>
  );
}

export default CartItem;
