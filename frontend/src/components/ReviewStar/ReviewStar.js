import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import './ReviewStar.css';

export default function ReviewStar() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(index) {
    setRating(index);
  }

  function handleMouseEnter(index) {
    setHover(index);
  }

  function handleMouseLeave() {
    setHover(0);
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const currentIndex = index + 1;

        return (
          <FaStar
            key={currentIndex}
            className={currentIndex <= (hover || rating) ? "active" : "inactive"}
            onClick={() => handleClick(currentIndex)}
            onMouseEnter={() => handleMouseEnter(currentIndex)}
            onMouseLeave={handleMouseLeave}
            size={40}
          />
        );
      })}
    </div>
  );
}
