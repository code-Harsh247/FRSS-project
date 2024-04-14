import React, { useState, useEffect } from 'react';
import "./ProductDetails.css";
import axios from "../../context/axiosConfig";
import CustomButton from "../Button/CustomButton";
import CustomButtonSecondary from '../Button/CustomButttonSecondary';
import Counter from '../Counter/Counter';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ProdDetails = ({ item }) => {
    const [mainImg, setMainImg] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useCart();
    const { isLoggedIn } = useAuth();
    const [duration, setDuration] = useState(1);
    const [quantity, setQuantity] = useState(1);

    const {setCacheCart} = useCart();

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const navigate = useNavigate();

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

    const rentProduct = () => {
        if (isLoggedIn) {
            console.log("Renting Now");
            navigate(`/rent/${item._id}/${quantity}/${duration}`);
        }else{
            alert("You are not logged in. Log in Rent Products.")
        }

    }

    const AddtoCart = async () => {
        console.log("Adding to cart");
        try {

            if (!isLoggedIn) {
                alert("You are not logged in. Log in to Add Items to Cart");
                throw new Error("User Not Logged In")
            }

            console.log(`Item ID: ${item.id} Quantity: ${quantity} Duration: ${duration}`)

            // Prepare data for the request
            const data = {
                productId: item.id, // Assuming the product ID is stored in item._id
                quantity: quantity, // Assuming you have the quantity stored in state
                duration: duration // Assuming you have the duration stored in state
            };

            
            // Make a POST request to add the product to the cart
            const response = await axios.post(`users/add-to-cart/${userId}`, data);
            setCacheCart(prevCacheCart => [...prevCacheCart, response.data.newCartItem]);
            // Handle success response
            console.log(response.data); // Assuming you want to log the response
            alert("Product added to cart successfully!");
            // Optionally, you can perform additional actions such as showing a success message or updating state
        } catch (error) {
            // Handle error
            console.error("Error adding product to cart:", error);
            // Optionally, you can show an error message to the user
        }
    }

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
                        <div className='Product-Rating'>
                            <p>{item ? `★ ${item.ratings.toFixed(1)}` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className='Product-Desc'>
                        <p>{item ? item.description : 'Loading...'}</p>
                    </div>
                </div>
                <div className='QuantitySelect'>
                    <span>Quantity</span>
                    <Counter valueFunc={setQuantity} defaultValue={quantity} />
                </div>
                <div className='DurationSelect'>
                    <span>Rent Duration (in months)</span>
                    <Counter valueFunc={setDuration} defaultValue={duration} />
                </div>

                <div className='Buttons'>
                    <CustomButton btnText="Rent now" handleClick={rentProduct} Btnwidth="100%" />
                    <CustomButtonSecondary btnText="Add to Cart" handleClick={AddtoCart} Btnwidth="100%" />
                </div>
            </div>
        </div>
    );
}

export default ProdDetails;
