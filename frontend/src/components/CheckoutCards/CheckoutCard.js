import React from 'react'
import "./CheckoutCard.css"

const CheckoutCard = ({ name, quantity, rentDuration, imgUrl,price }) => {
    return (
        <div className="rental-label">
            <div className='rental-label-img'>
                <img src={imgUrl} alt="Product" />
            </div>
            <div className='rental-label-details-wrapper'>
                <div className="rental-label__name">{name}</div>
                <div className="rental-label__details">
                    <div className='Quantity'>
                    <div><p>Quantity :</p></div>
                    <div><p>{quantity}</p></div>
                    </div>
                    <div className='Price'>
                    <div><p>Price :</p></div>
                    <div><p>{price}/month</p></div>
                    </div>
                    <div className='Duration'>
                    <div><p>Rent Duration :</p></div>
                    <div><p>{rentDuration} month(s)</p></div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default CheckoutCard