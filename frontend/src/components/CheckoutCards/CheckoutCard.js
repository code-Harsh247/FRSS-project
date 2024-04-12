import React from 'react'
import "./CheckoutCard.css"

const CheckoutCard = ({ name, quantity, rentDuration, imgUrl }) => {
    return (
        <div className="rental-label">
            <div className='rental-label-img'>
                <img src={imgUrl} alt="Product" />
            </div>
            <div className='rental-label-details-wrapper'>
                <div className="rental-label__name">{name}</div>
                <div className="rental-label__details">
                    <div><p>Quantity :</p><p>{quantity}</p></div>
                    <div><p>Rent Duration :</p><p>{rentDuration} month(s)</p></div>
                </div>
            </div>



        </div>
    )
}

export default CheckoutCard