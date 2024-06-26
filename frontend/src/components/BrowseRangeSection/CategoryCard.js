import React from 'react';
import './CategoryCard.css';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({imgURL, title}) => {

    const navigate = useNavigate();

    const handleClick=()=>{
        navigate(`/category/${title}`)
    }

    return (
        <div className='BRsec-Category-Card-Container' onClick={handleClick}>
                <div className='Category-img'>
                    <img src={imgURL} alt={title}></img>
                <div/>
            </div>
            <p className='category-title'>{title}</p>
        </div>

    );
};

export default CategoryCard;

