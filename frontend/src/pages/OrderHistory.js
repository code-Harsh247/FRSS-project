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
    const { loading, setLoading, userId } = useCart(); // Removed cartData since we're not fetching it here
    const { isLoggedIn } = useAuth();
    const [orderHistory, setOrderHistory] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState([]);
    const navigate = useNavigate();

    const { products } = useProducts();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            // Fetch order history data from the backend
            try {
                // Assuming the API endpoint to fetch order history is '/users/order-history/:userId'
                const response = await axios.get(`/users/rented/${userId}`);
                console.log("Rented : ", response.data.rentedItems);
                setOrderHistory(response.data.rentedItems);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order history:", error);
                setLoading(false);
            }
        };


        fetchOrderHistory();
    }, [userId, setLoading]);

    useEffect(() => {
        const fetchOrderedProducts = () => {
            // Filter products based on rented IDs
            const filteredProducts = products.filter((product) =>
                orderHistory.some((item) => item.ProductId === product.id)
            );

            // Map filtered products to include quantity and duration
            const orderedProductsData = filteredProducts.map((product) => {
                const matchingItem = orderHistory.find(
                    (item) => item.ProductId === product.id
                );
                const dateObject = new Date(matchingItem.Date);
                const formattedDate = `${dateObject.toLocaleDateString()} at ${dateObject.toLocaleTimeString()}`;
                const timeDue  = `${matchingItem.TimeDue} day(s)`
                return {
                    ...product,
                    quantity: matchingItem.Quantity,
                    duration: matchingItem.RentDuration,
                    Date: formattedDate,
                    timeDue: timeDue,
                    status: matchingItem.Status
                    // Assuming RentDuration is the property name in order history
                };
            });

            setOrderedProducts(orderedProductsData);
        };

        fetchOrderedProducts();
    }, [orderHistory, products]);

    console.log(orderedProducts);

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

            {isLoggedIn && orderHistory.length === 0 && (
                <div className="EmptyOrderHistory">
                    <p>Your order history is empty.</p>
                </div>
            )}

            {isLoggedIn && orderHistory.length > 0 && (
                <div className="OrderHistoryItemsContainer">
                    {orderedProducts.map((item) => {
                        console.log("Date:", item); // Log the date outside of JSX
                        return (
                            <HistoryProductCard
                                key={item._id}

                                img={item.image[0]}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                duration={item.duration}
                                date={item.Date}
                                timeDue = {item.timeDue}
                                status={item.status}
                                orderId={item}
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
