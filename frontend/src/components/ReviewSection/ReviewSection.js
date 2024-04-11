import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import CustomButtonSecondary from '../Button/CustomButttonSecondary';
import './ReviewSection.css';
import Comment from '../Review/Comment';
import InputBox from '../InputBox/InputBox'


function ReviewSection({ AvgRating }) {

    const [showAddReview, setShowAddReview] = useState(false);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState('');

    const AddReview = () => {
        console.log("Review Added");
        setShowAddReview(true);
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
                        <InputBox
                            type="text"
                            onInputChange={setReviewComment}
                            autocomplete="off"
                            placeholder="Enter your comment" 
                            />
                    )}

                </div>
            </div>
        </div>
    );
}

export default ReviewSection;