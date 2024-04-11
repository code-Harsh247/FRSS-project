import React from 'react';
import { FaStar } from "react-icons/fa";
import CustomButtonSecondary from '../Button/CustomButttonSecondary';
import './ReviewSection.css';

function ReviewSection() {
    return (
        <div className='ReviewSectionMainContainer'>
            <div className='ReviewSectionTitle'>
                <p>Reviews</p>
            </div>
            <div className='ReviewSectionContent'>
                <div className='ReviewSectionComments'>

                    <div className='Comment2'>
                        <div className="RatingAndTitle">
                            <div className='RatingSection'>
                                <pre>4 </pre>
                                <FaStar color='green' size={20} />
                            </div>
                            <div className='CommentTitle'>
                                <span>
                                    Fab Furniture
                                </span>

                            </div>
                        </div>
                        <div className="CommentContent">
                            <p>
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='ReviewSectionOverallRating'>
                    <div className='AverageRating'>
                        <p className="AverageRatingPre">4.3</p>
                        <div className='AverageaRatingStar'><FaStar size={50}/></div>
                    </div>
                    <div className='RateProductButton'>
                    <CustomButtonSecondary btnText="Rate Product" handleClick={() => console.log("Comment Add")} Btnwidth="80%" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewSection;