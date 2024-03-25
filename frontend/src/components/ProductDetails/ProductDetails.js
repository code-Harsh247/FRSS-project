import React from 'react'
import "./ProductDetails.css"

const ProdDetails = (props) => {
    return (
        <div className='Product-Details-Container'>
            <div className='Product-Pictures'>
                <div className='Product-Other-Pictures'>
                    <div className='ProdPic' id='pic1'>
                    </div>
                    <div className='ProdPic' id='pic2'>
                    </div>
                    <div className='ProdPic' id='pic3'>
                    </div>
                </div>
                <div className='Product-Main-Picture'>
                </div>
            </div>
            <div className='Product-Details'>
                <div className='Product-Name'>
                    <p>{props.title}</p>
                </div>
                <div className='Product-Price'>
                    <p>{props.price}</p>
                </div>
            </div>
        </div>
    )
}

export default ProdDetails