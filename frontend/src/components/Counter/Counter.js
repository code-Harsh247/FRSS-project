import React, { useState } from 'react';
import './Counter.css';

function Counter({ onCountChange }) {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
    // Call the onCountChange function with the new count
    onCountChange(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
    if (count > 1) {
      setCount(count - 1);
      // Call the onCountChange function with the new count
      onCountChange(count - 1);
    }
  };

  return (
    <div className="counter">
      <button onClick={decrement} className='CounterBtn'>-</button>
      <span>{count}</span>
      <button onClick={increment} className='CounterBtn'>+</button>
    </div>
  );
}
}
export default Counter;
