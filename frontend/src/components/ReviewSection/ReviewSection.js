import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import CustomButtonSecondary from '../Button/CustomButttonSecondary';
import './ReviewSection.css';
import Comment from '../Review/Comment';
import StarRating from '../StarComponent/StarRating';


function ReviewSection({ AvgRating }) {

    const [showAddReview, setShowAddReview] = useState(false);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(0);

    const AddReview = () => {
        console.log("Review Added");
        setShowAddReview(true);
    }

    const submitReview = () => {
        console.log("Submitting Review: ", reviewComment, reviewRating);
        // Here you would likely send this data to a server
        setShowAddReview(false); // Hide input fields after submission
        setReviewComment(''); // Reset comment
        setReviewRating(''); // Reset rating
    }
    
    return (
        <div className='ReviewSecContainer'>
            <div className='ReviewsHeader'>
                <span>Reviews</span>
            </div>
            <div className='CommentsAndRating'>
                <div className='CommentsSection'>
                    <Comment title="Amazing" comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                        rating="4.5" />
                </div>
                <div className='Rating'>
                    <div className='RatingAndStar'>
                        <FaStar size={60} />
                        <p>4.5</p>
                    </div>
                    <p>Average Rating</p>

                    {!showAddReview && (
                        <div>
                            <CustomButtonSecondary btnText="Add your Review" handleClick={AddReview} Btnwidth="20vw" />
                        </div>
                    )}
                    {showAddReview && (
                        <div className="ReviewInputs">
                        <StarRating rating={reviewRating} onChange={setReviewRating} />
                        <textarea
                            placeholder="Enter your comment"
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                        />
                        <CustomButtonSecondary btnText="Submit Review" handleClick={submitReview} Btnwidth="20vw" />
                    </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ReviewSection;