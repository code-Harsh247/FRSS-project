import React from 'react'
import "./BRsection.css"
import CategoryCard from './CategoryCard'
import chairImg from "../assets/images/chair.jpg"
import sofaImg from "../assets/images/sofa.jpg"
import bedImg from "../assets/images/beds.jpg"
import tableImg from "../assets/images/tables.jpg"
import { useCategories } from '../../context/CategoriesContext'


const BRsection = () => {
  const {categories} = useCategories();
  return (
    <div className='BRsection-Container'>
      <div className='BRsec-header'>
        <p id='header-text'>Browse The Range</p>
        <p id='header-text-below'>Choose from our finest collection</p>
      </div>
      <div className='categories'>
        {categories.map((crd) => (
          <CategoryCard key={crd.id} title={crd.name} imgURL={crd.ImgUrl}/>
        ))}
      </div>
    </div>
  )
}

export default BRsection