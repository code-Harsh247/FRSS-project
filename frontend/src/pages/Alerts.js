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
import { useProducts } from "../context/ProductContext";

function Alerts() {
    const { isAdminLoggedIn } = useAdminAuth();
    const [orderAlerts, setOrderAlerts] = useState([]);
    const [inventoryNotifications, setInventoryNotifications] = useState([]);
    const [returnOrderAlerts, setReturnOrderAlerts] = useState([]);
    const {products} = useProducts(); 





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
                const response = await axios.get("/admin/return-requests");
                setReturnOrderAlerts(response.data.returnRequests);
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
    const [fetchedOrders,setFetchedOrders] = useState([]);
    useEffect(() => {
        // Initialize an empty array to store the fetched orders
        const newFetchedOrders = [];
        // Iterate through returnOrderAlerts to find corresponding orders
        for (const obj of returnOrderAlerts) {
            // Extract the OrderID from the alert object
            const orderId = Number(obj.OrderID);

            // Find the order in orderAlerts array based on the OrderID
            const order = orderAlerts.find(order => order.OrderID === orderId);

            // If order is found, push it to the fetchedOrders array
            if (order) {
                newFetchedOrders.push(order);
            }
        }
        setFetchedOrders(newFetchedOrders);
        console.log('Fetched Orders:', fetchedOrders);
    }, [orderAlerts, returnOrderAlerts]);





    console.log("renturnOrderAlerts : ", returnOrderAlerts);

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
    console.log(orderAlerts);
    if (isAdminLoggedIn) {
        return (
            <div className="AlertsContainer">
                <AdminNavbar />
                <AdminBanner name="Alerts" />
                <div className="AlertsContent">
                    {/* Order Alerts Section */}
                    <div className="OrderAlerts">
                        <div className="OrderAlertsTitle">
                            <span id="Title">Order Alerts</span>
                            {/* <div className="ClearOrderAlerts">
                                <button onClick={handleClearOrderAlerts}>Clear All</button>
                            </div> */}
                        </div>
                        <div className="OrderAlertsList">
                            {orderAlerts.length === 0 && (
                                <div className="NoAlertsMessage">
                                    <span>No Recent Orders</span>
                                </div>
                            )}
                            {orderAlerts.map((order) => (
                                <OrderAlertsCard
                                    key={order._id}
                                    order={order}
                                />
                            ))}
                        </div>
                    </div>

                    {console.log("Test : ",fetchedOrders)}
                    <div className="OrderAlerts">
                        <div className="OrderAlertsTitle">
                            <span id="Title">Return Requests</span>
                            <div className="ClearOrderAlerts">
                                <button onClick={handleClearReturnOrderAlerts}>Clear All</button>
                            </div>
                        </div>
                        <div className="OrderAlertsList">
                            {fetchedOrders.length === 0 && (
                                <div className="NoAlertsMessage">
                                    <span>No Return Requests</span>
                                </div>
                            )}
                            {fetchedOrders.map((returnOrder) => (
                                <OrderReturnCard
                                    key={returnOrder._id}
                                    order={returnOrder} 
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
                                    prodName = {notification.ProductName}
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
