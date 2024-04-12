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

function OrderHistory() {
    const { loading, setLoading, userId } = useCart(); // Removed cartData since we're not fetching it here
    const { isLoggedIn } = useAuth();
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            // Fetch order history data from the backend
            try {
                // Assuming the API endpoint to fetch order history is '/users/order-history/:userId'
                const response = await axios.get(`/users/order-history/${userId}`);
                setOrderHistory(response.data.orderHistory);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order history:", error);
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [userId, setLoading]);

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
                        <CustomButton btnText="Log in" handleClick={() => {/* Handle login */}} Btnwidth="8.5em"/>
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
                    {orderHistory.map((item) => (
                        <HistoryProductCard
                            key={item.id}
                            img={item.image}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            duration={item.duration}
                        />
                    ))}
                </div>
            )}

            <ServiceBanner  />
            <Footer />
        </div>
    );
}

export default OrderHistory;
