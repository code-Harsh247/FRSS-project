import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';  // Ensure you create this CSS file for styling

function StarRating({ count = 5, value = 0, onChange }) {
    const [hover, setHover] = useState(null);

    return (
        <div className="star-rating">
            {[...Array(count)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => onChange(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            className="star"
                            size={30}
                            color={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;
