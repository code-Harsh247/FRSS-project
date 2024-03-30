import React, { useState, useEffect } from 'react';
import Counter from '../Counter/Counter';
import "./ProductDetails.css";
import CustomButton from "../Button/CustomButton";
import CustomButtonSecondary from '../Button/CustomButttonSecondary';

const ProdDetails = ({ item }) => {
    const [mainImg, setMainImg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        if (item && item.image && item.image.length > 0) {
            setMainImg(item.image[0]);
        }
    }, [item]);

    const handleMainImg = (index) => {
        setMainImg(item.image[index]);
        setSelectedImageIndex(index);
    };

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className='Product-Details-Container'>
            <div className='Product-Pictures'>
                <div className='Product-Other-Pictures'>
                    {item && item.image && item.image.map((img, index) => (
                        <div
                            className={`ProdPic ${index === selectedImageIndex ? 'selected' : ''}`}
                            key={index}
                            id={`pic${index}`}
                            onClick={() => handleMainImg(index)}
                        >
                            {index === 0 && loading ? (
                                <img src={img} alt={item.name} style={{ display: 'none' }} onLoad={handleImageLoad} />
                            ) : (
                                <img src={img} alt={item.name} onLoad={handleImageLoad} />
                            )}
                        </div>
                    ))}
                </div>
                <div className='Product-Main-Picture'>
                    {mainImg && (
                        <>
                            {loading ? (
                                <div>Loading main image...</div>
                            ) : (
                                <img src={mainImg} alt={item.name} onLoad={handleImageLoad} />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className='Product-Details-Wrapper'>
                <div className='Product-Details'>
                    <div className='Product-Name'>
                        <p>{item ? item.name : 'Loading...'}</p>
                    </div>
                    <div className='Product-Price'>
                        <p>{item ? `Rs ${item.price} / month` : 'Loading...'}</p>
                    </div>
                    <div className='Product-Desc'>
                        <p>{item ? item.description : 'Loading...'}</p>
                    </div>
                    <Counter />
                </div>
                <div className='Buttons'>
                    <CustomButton btnText="Rent now" handleClick={() => console.log("Buying now")} Btnwidth="100%" />
                    <CustomButtonSecondary btnText="Add to Cart" handleClick={() => console.log("Product Added to cart")} Btnwidth="100%" />
                </div>
            </div>
        </div>
    );
}

export default ProdDetails;
