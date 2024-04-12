import React, { useEffect, useState } from 'react';
import axios from "../../context/axiosConfig"
import { FaStar } from "react-icons/fa";
import CustomButtonSecondary from '../Button/CustomButttonSecondary';
import CustomButton from '../Button/CustomButton';
import './ReviewSection.css';
import Comment from '../Review/Comment';
import StarRating from '../StarComponent/StarRating';


function ReviewSection({ product }) {

    const [showAddReview, setShowAddReview] = useState(false);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewRating, setReviewRating] = useState(0);

    const [reviews, setReviews] = useState([]);
    const [AvgRating, setAvgRating] = useState(0);
    const [prodID, setProdID] = useState(null)

    const AddReview = () => {
        console.log("Review Added");
        setShowAddReview(true);
    }
    useEffect(() => {
        if (product && product.comments) {
            setReviews(product.comments);
            setAvgRating(product.ratings.toFixed(1));
            setProdID(product.id);
        }
    }, [product]);

    const CancelReview = () => {
        setShowAddReview(false);
        setReviewComment(''); // Reset comment
        setReviewTitle('');
        setReviewRating('');
    }

    const submitReview = async () => {

        if (!reviewRating || reviewRating === 0) {
            alert("Please provide a rating");
            return;
        }
        if (!reviewTitle) {
            alert("Please enter a comment title");
            return;
        }
        if (!reviewComment) {
            alert("Please enter your comment");
            return;
        }

        console.log("Submitting Review: ", reviewTitle, reviewComment, reviewRating);

        const reviewData = {
            rating: reviewRating,
            commentTitle: reviewTitle,
            comment: reviewComment
        };
        try {
            const response = await axios.post(`/products/addcomment/${prodID}`, reviewData)
            setReviews([...reviews, reviewData]);
            setShowAddReview(false); // Hide input fields after submission
            setReviewComment(''); // Reset comment
            setReviewTitle('');
            setReviewRating(''); // Reset rating
            alert("Review Added. Note : Average Ratings are updated on refresh");
        }
        catch (error) {
            console.error("Error submitting review:", error);
        }
    }

    return (
        <div className='ReviewSecContainer'>
            <div className='ReviewsHeader'>
                <span>Reviews</span>
            </div>
            <div className='CommentsAndRating'>
                <div className='CommentsSection'>
                    {reviews.length !== 0 ? (
                        reviews.map((review) => (
                            <Comment
                                key={review._id} // Assuming each review has a unique ID
                                title={review.commentTitle}
                                comment={review.comment}
                                rating={review.rating}
                            />
                        ))
                    ) : (
                        <span>No reviews Available</span>
                    )}
                </div>

                <div className='Rating'>
                    <div className='RatingAndStar'>
                        <FaStar size={60} />
                        <p>{AvgRating}</p>
                    </div>
                    <p>Average Rating</p>

                    {!showAddReview && (
                        <div>
                            <CustomButtonSecondary btnText="Add your Review" handleClick={AddReview} Btnwidth="20vw" />
                        </div>
                    )}
                    {showAddReview && (
                        <div className="ReviewInputs">
                            <div className='YourRating'>
                                <span>Your Rating: </span>
                                <StarRating value={reviewRating} onChange={setReviewRating} />
                            </div>
                            <textarea
                                className='Comment-Title-Input'
                                placeholder='Enter Comment Title'
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)} />
                            <textarea
                                className='Comment-Body'
                                placeholder="Enter your comment"
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                            />
                            <CustomButton btnText="Submit Review" handleClick={submitReview} Btnwidth="100%" />
                            <CustomButtonSecondary btnText="Cancel" handleClick={CancelReview} Btnwidth="100%" />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ReviewSection;