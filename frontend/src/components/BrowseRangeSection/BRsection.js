import React from 'react'
import "./BRsection.css"
import CategoryCard from './CategoryCard'
import chairImg from "../assets/images/chair.jpg"

const cardImgURLS = [
  { id: 1, title: 'Chair', url: '../assets/images/chair.jpg' },
  { id: 2, title: 'Sofa', url: '../assets/images/sofa.jpeg' },
  { id: 3, title: 'Card 3', url: 'Content for card 3' }
];

const BRsection = () => {
  return (
    <div className='BRsection-Container'>
        <div className='BRsec-header'>
            <p id='header-text'>Browse The Range</p>
            <p id='header-text-below'>Choose from our finest collection</p>
        </div>
        <div className='categories'>
            <CategoryCard imgURL={chairImg}/>
        </div>
    </div>
  )
}

export default BRsection