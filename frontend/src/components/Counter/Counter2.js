import React, { useState, useEffect } from 'react';
import "./Counter2.css"

function Counter({ valueFunc, defaultValue }) {
  const [count, setCount] = useState(defaultValue);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  useEffect(() => {
    valueFunc(count);
  }, [count, valueFunc]);

  return (
    <div className="CounterControl">
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default Counter;
