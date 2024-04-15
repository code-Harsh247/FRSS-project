import React, { useEffect, useState } from "react";
import axios from "../context/axiosConfig"; // Import the axios instance
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import "./Css/Alerts.css";
import OrderAlertsCard from "../components/OrderAlertsCard/OrderAlertsCard";
import InventoryNotificationCard from "../components/InventoryNotificationCard/InventoryNotificationCard";
import AdminLoginPage from "./AdminLoginPage";
import { useAdminAuth } from "../context/AdminAuthContext";
import OrderReturnCard from "../components/OrderReturnCard/OrderReturnCard";

function Alerts() {
    const { isAdminLoggedIn } = useAdminAuth();
    const [orderAlerts, setOrderAlerts] = useState([]);
    const [inventoryNotifications, setInventoryNotifications] = useState([]);
    const [returnOrderAlerts, setReturnOrderAlerts] = useState([]);



    
    
    useEffect(() => {
        const fetchOrderAlerts = async () => {
            try {
                // Fetch order alerts from the backend
                const response = await axios.get("/admin/orders");
                setOrderAlerts(response.data.orders);
            } catch (error) {
                console.error("Error fetching order alerts:", error);
            }
        };

        const fetchInventoryNotifications = async () => {
            try {
                // Fetch inventory notifications from the backend
                const response = await axios.get("/admin/notifications");
                setInventoryNotifications(response.data.notifications);
            } catch (error) {
                console.error("Error fetching inventory notifications:", error);
            }
        };

        const fetchReturnOrderAlerts = async () => {
            try {
                // Fetch return order alerts from the backend
                const response = await axios.get("/admin/return-orders");
                setReturnOrderAlerts(response.data.returnOrders);
            } catch (error) {
                console.error("Error fetching return order alerts:", error);
            }
        };

        if (isAdminLoggedIn) {
            fetchOrderAlerts();
            fetchInventoryNotifications();
            fetchReturnOrderAlerts();
        }
    }, [isAdminLoggedIn]);
    useEffect(() => {
        const fetchReturnOrderAlerts = async () => {
            try {
                // Fetch return order alerts from the backend
                const response = await axios.get("/admin/return-requests");
                setReturnOrderAlerts(response.data.returnRequests);
            } catch (error) {
                console.error("Error fetching return order alerts:", error);
            }
        };
    
        if (isAdminLoggedIn) {
            
            fetchReturnOrderAlerts(); // Call the function to fetch return order alerts
        }
    }, [isAdminLoggedIn]);


    // Handlers for clearing alerts
    const handleClearOrderAlerts = async () => {
        try {
            // Clear all order alerts
            await axios.post("/admin/empty-orders");
            // Clear the local state
            setOrderAlerts([]);
        } catch (error) {
            console.error("Error clearing order alerts:", error);
        }
    };

    const handleClearInventoryNotifications = async () => {
        try {
            // Clear all inventory notifications
            await axios.post("/admin/empty-notifications");
            // Clear the local state
            setInventoryNotifications([]);
        } catch (error) {
            console.error("Error clearing inventory notifications:", error);
        }
    };

    const handleClearReturnOrderAlerts = async () => {
        try {
            // Clear all return order alerts
            await axios.post("/admin/empty-return-orders");
            // Clear the local state
            setReturnOrderAlerts([]);
        } catch (error) {
            console.error("Error clearing return order alerts:", error);
        }
    };

    if (isAdminLoggedIn) {
        return (
            <div className="AlertsContainer">
                <AdminNavbar  />
                <AdminBanner name="Alerts" />
                <div className="AlertsContent">
                    {/* Order Alerts Section */}
                    <div className="OrderAlerts">
                        <div className="OrderAlertsTitle">
                            <span id="Title">Order Alerts</span>
                            <div className="ClearOrderAlerts">
                                <button onClick={handleClearOrderAlerts}>Clear All</button>
                            </div>
                        </div>
                        <div className="OrderAlertsList">
                            {orderAlerts.length === 0  && (
                                <div className="NoAlertsMessage">
                                    <span>No Recent Orders</span>  
                                </div>
                            )}
                            {orderAlerts.map((order) => (
                                <OrderAlertsCard
                                    key={order.id}
                                    image={order.image}
                                    productId={order.ProductID}
                                    userName={order.Username}
                                    userId={order.UserID}
                                    duration={order.Duration}
                                    price={order.Price}
                                    quantity={order.Quantity}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Return Order Alerts Section */}
                    <div className="OrderAlerts">
    <div className="OrderAlertsTitle">
        <span id="Title">Return Order Alerts</span>
        <div className="ClearOrderAlerts">
            <button onClick={handleClearReturnOrderAlerts}>Clear All</button>
        </div>
    </div>
    <div className="OrderAlertsList">
    {returnOrderAlerts.length === 0 && (
        <div className="NoAlertsMessage">
            <span>No Return Orders</span>  
        </div>
    )}
    {returnOrderAlerts.map((returnOrder) => (
        console.log(returnOrder),
        <OrderReturnCard
            key={returnOrder._id}
            orderId={returnOrder.OrderID}
        />
    ))}
</div>

</div>


                    {/* Inventory Notifications Section */}
                    <div className="Notification">
                        <div className="NotificationTitle">
                            <span id="Title">Inventory Notification</span>
                            <div className="ClearOrderAlerts">
                                <button onClick={handleClearInventoryNotifications}>Clear All</button>
                            </div>
                        </div>
                        <div className="NotificationList">
                            {inventoryNotifications.length === 0 && (
                                <div className="NoAlertsMessage">
                                    <span>Inventory Looks Good</span>  
                                </div>
                            )}
                            {inventoryNotifications.map((notification) => (
                                <InventoryNotificationCard
                                    key={notification._id}
                                    productId={notification.ProductID}
                                    imageUrl={notification.image}
                                    quantity={notification.Quantity}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <AdminLoginPage />;
    }
}

export default Alerts;
