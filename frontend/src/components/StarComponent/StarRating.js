import React, { useState } from 'react';
import './StarRating.css'; // Ensure you create this CSS file for styling

function StarRating({ count = 5, value = 0, onChange }) {
    const [hover, setHover] = useState(null);

    return (
        <div className="star-rating">
            {[...Array(count)].map((_, index) => {
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
                        <span
                            className="star"
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        >
                            {ratingValue <= (hover || value) ? '★' : '☆'}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;
