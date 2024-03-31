import React from 'react'
import "./ShopCategoryBanner.css"

const ShopCategoryBanner = ({title, Img, desc}) => {
  return (
    <div id='Banner-Container'>
        <div id="Img-Container">
            <img src={Img} alt={title}/>
        </div>
        <div id='Banner-Wrapper'>
            
        </div>
    </div>
  )
}

export default ShopCategoryBanner