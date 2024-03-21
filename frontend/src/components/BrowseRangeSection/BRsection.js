import React from 'react'
import "./BRsection.css"
import CategoryCard from './CategoryCard'
import chairImg from "../assets/images/chair-no-bg.png"
import sofaImg from "../assets/images/couch-no-bg.png"
import lampImg from "../assets/images/lamps-no-bg.png"

const cardImgURLS = [
  { id: 1, title: 'Chairs', url: chairImg },
  { id: 2, title: 'Sofas', url: sofaImg },
  { id: 3, title: 'Lamps', url: lampImg }
];

const BRsection = () => {
  return (
    <div className='BRsection-Container'>
      <div className='BRsec-header'>
        <p id='header-text'>Browse The Range</p>
        <p id='header-text-below'>Choose from our finest collection</p>
      </div>
      <div className='categories'>
        {cardImgURLS.map((crd) => (
          <CategoryCard key={crd.id} title={crd.title} imgURL={crd.url} />
        ))}
      </div>
    </div>
  )
}

export default BRsection