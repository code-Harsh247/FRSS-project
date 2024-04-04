import React, { useState } from 'react';
import './CartItem.css';
import Counter from '../Counter/Counter';
import closeicon from '../assets/Icons/close.png';

function CartItem({ product }) {
  const [quantity, setQuantity] = useState(1);

  // Function to handle count change
  const handleCountChange = (newCount) => {
    setQuantity(newCount);
  };

  const deleteItem=()=>{
    console.log('delete item');
  }

  return (
    <div className="cartitemcontainer">
      <div className='CartItemImageContainer'>
        <img
          className="cart-item-image"
          src={product.imageUrl} // Assuming you have an imageUrl property
          alt={product.name}
        />
      </div>
      <div className="cartiteminfo">
        <h3 className="cartitemname">{product.name}</h3>
        <span className="cartitemprice">
          ₹{(product.price * quantity).toLocaleString()}/month
        </span>
        <div className="cartitemquantity">
          <div className="quantity">
            <div className="counter">
              {/* Pass handleCountChange function to Counter component */}
              <Counter onCountChange={handleCountChange} />
            </div>
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
