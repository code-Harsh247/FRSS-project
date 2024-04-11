import React from 'react'
import "./Comment.css"
import { FaStar } from 'react-icons/fa'

const Comment = ({ title, comment, rating }) => {
    return (
        <div className='Comment-Container'>
            <div className='TitleAndRating'>
                <div className='RatingStar'>
                    <FaStar size={25}/>
                    <p>{rating}</p>
                </div>
                <div className='Comment-Title'>
                    <span>{title}</span>
                </div>
            </div>
            <div className='TheComment'>
                <p>{comment}</p>
            </div>

        </div>
    )
}

export default Comment