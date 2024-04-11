import React, { useEffect, useState } from "react";
import axios from "../context/axiosConfig";
import "./Css/Cart.css";
import ShopBanner from "../components/ShopBanner/ShopBanner";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ServiceBanner from "../components/ServiceBanner/ServiceBanner";
import CartItem from "../components/CartItem/CartItem";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../components/Button/CustomButton";

function Cart() {
    const { cartData, loading, setLoading, userId } = useCart();
    const { isLoggedIn } = useAuth();
    const { products } = useProducts();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if cart is empty and update loading state accordingly
        if (cartData.length === 0) {
            setLoading(false);
        }
    }, [cartData, setLoading]);

    // Filter out the initial empty object
    const filteredCartData = cartData.filter(
        (item) => Object.keys(item).length !== 0
    );

    const handleButtonClick=()=>{
        navigate('/login');
    }

    const cartProds = [];

    // Iterate over each item in cartData
    filteredCartData.forEach((cartItem) => {
        // Find the product in the products array with matching ID
        const product = products.find((product) => product.id === cartItem.id);

        // If a matching product is found, add it to the cartProducts array
        if (product) {
            const productWithQuantity = { ...product, 
                quantity: cartItem.count,
                duration: cartItem.duration
             };
            cartProds.push(productWithQuantity);
        }
    });

    const [cartProducts, setCartItems] = useState(cartProds);

    const deleteProduct = async (productId)=>{
        try{
            const url = `users/delete-product/${userId}/${productId}`;
            const response = await axios.delete(url);
            console.log(response.data.message);
        }
        catch(error){
            console.error("Error deleting product from cart:", error.response ? error.response.data : error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    const handleRemoveItem = (id) => {
        deleteProduct(id);
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));

      };

    const checkout=()=>{
        console.log("Checkout")
    }

    return (
        <div className="MainCartContainer">
            <Navbar />
            <ShopBanner name="Cart" />

            {!isLoggedIn && <div id="LogInCart">
                <p>Please Login to view your cart</p>
                <div className="LoginBtn">
                    <CustomButton btnText="Log in" handleClick={handleButtonClick} Btnwidth="8.5em"/>
                </div>
            </div>}

            {isLoggedIn && cartProducts.length === 0 && (
                <div className="EmptyCart"><p>Your cart is empty.</p></div>
            )}

            {isLoggedIn && cartProducts.length > 0 && (
                <div className="CartItemsContainer">
                    {cartProducts.map((item) => (
            
                        <CartItem
                            key={item.id}
                            price={item.price}
                            name={item.name}
                            q={item.quantity}
                            d={item.duration}
                            img={item.image[0]}
                            deleteItem={() => handleRemoveItem(item.id)}
                        />
                    ))}
                </div>
            )}
            <div className="CheckOut-Btn">
                <CustomButton Btnwidth="100%" btnText="Checkout" handleClick={checkout}/>
            </div>
            <ServiceBanner />
            <Footer />
        </div>
    );
}

export default Cart;
