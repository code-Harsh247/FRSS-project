import React, { useEffect, useState } from "react";
import axios from "../context/axiosConfig";
import "./Css/OrderHistory.css";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ServiceBanner from "../components/ServiceBanner/ServiceBanner";
import HistoryProductCard from "../components/HistoryProductCard/HistoryProductCard";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/Button/CustomButton";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
    const { loading, setLoading, userId } = useCart();
    const { isLoggedIn } = useAuth();
    const [orderHistory, setOrderHistory] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState([]);
    const navigate = useNavigate();

    const { products } = useProducts();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`/users/rented/${userId}`);
                    setOrderHistory(response.data.rentedItems);
                    setLoading(false);
                }

            } catch (error) {
                console.error("Error fetching order history:", error);
                setLoading(false);
            }
        };
        console.log("OrderHistory : ", orderHistory);
        fetchOrderHistory();
    }, [userId, setLoading]);

    useEffect(() => {
        const fetchOrderedProducts = async () => {
            const orderedProductsData = await Promise.all(orderHistory.map(async (orderItem) => {
                const matchingProduct = products.find((product) => product.id === orderItem.ProductId);
                if (!matchingProduct) {
                    return null; // Product not found, handle accordingly
                }
                const dateObject = new Date(orderItem.Date);
                const formattedDate = `${dateObject.toLocaleDateString()} at ${dateObject.toLocaleTimeString()}`;
                const timeDueResponse = await axios.get(`/users/time-due/${userId}/${orderItem._id}`);
                const timeDue = timeDueResponse.data.timeDue;
                return {
                    ...matchingProduct,
                    quantity: orderItem.Quantity,
                    duration: orderItem.RentDuration,
                    Date: formattedDate,
                    timeDue: timeDue,
                    status: orderItem.Status,
                    orderId: orderItem.orderId,
                    isDamaged: orderItem.Damaged,
                };
            }));
    
            // Filter out null values (products not found) and set ordered products
            setOrderedProducts(orderedProductsData.filter(product => product !== null));
        };
    
        fetchOrderedProducts();
    }, [orderHistory, products, userId]);
        

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="MainOrderHistoryContainer">
            <Navbar />
            <AdminBanner name="Orders" />

            {!isLoggedIn && (
                <div id="LogInOrderHistory">
                    <p>Please login to view your order history</p>
                    <div className="LoginBtn">
                        <CustomButton btnText="Log in" handleClick={() => { navigate('/login') }} Btnwidth="8.5em" />
                    </div>
                </div>
            )}
            {console.log("Order History Now :", orderedProducts)}
            {isLoggedIn && orderHistory.length === 0 && (
                <div className="EmptyOrderHistory">
                    <p>Your order history is empty.</p>
                </div>
            )}

            {isLoggedIn && orderHistory.length > 0 && (
                <div className="OrderHistoryItemsContainer">
                    {orderedProducts.map((item) => {

                        return (
                            <HistoryProductCard
                                key={item._id}
                                img={item.image[0]}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                duration={item.duration}
                                date={item.Date}
                                timeDue={item.timeDue}
                                status={item.status}
                                orderId={item.orderId}
                                userId={userId}
                                isDamaged = {item.isDamaged}
                                cost = {item.cost}
                            />
                        );
                    })}
                </div>
            )}
            <ServiceBanner />
            <Footer />
        </div>
    );
}

export default OrderHistory;
