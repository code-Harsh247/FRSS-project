import React from 'react'
import Counter from '../Counter/Counter';
import "./ProductDetails.css"

const ProdDetails = ({item}) => {
    if (!item) {
        // Render some placeholder or return null if there's no product data
        return <div>Loading product details...</div>;
      }

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
                    <img src={item.image} alt={item.name}/>
                </div>
            </div>
            <div className='Product-Details-Wrapper'>
                <div className='Product-Details'>
                    <div className='Product-Name'>
                        <p>{item.name}</p>
                    </div>
                    <div className='Product-Price'>
                        <p>{`Rs ${item.price}`}</p>
                    </div>
                    <div className='Product-Desc'>
                        <p>{item.description}</p>
                    </div>
                    <Counter/>
                </div>
            </div>
        </div>
    )
}

export default ProdDetails