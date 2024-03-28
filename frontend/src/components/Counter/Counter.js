import React, { useState } from 'react';
import "./Counter.css"

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
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

export default Counter;
