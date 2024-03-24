import React from 'react'
import "./BRsection.css"
import CategoryCard from './CategoryCard'
import chairImg from "../assets/images/chair-no-bg.png"
import sofaImg from "../assets/images/sofa-no-bg.png"
import bedImg from "../assets/images/bed-no-bg.png"
import tableImg from "../assets/images/table-no-bg.png"

const cardImgURLS = [
  { id: 1, title: 'Beds', url: bedImg},
  { id: 2, title: 'Chairs', url: chairImg },
  { id: 3, title: 'Sofas', url: sofaImg },
  { id: 4, title: 'Tables', url: tableImg}
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