import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import "./Css/Alerts.css";
import OrderAlertsCard from "../components/OrderAlertsCard/OrderAlertsCard";
import InventoryNotificationCard from "../components/InventoryNotificationCard/InventoryNotificationCard";
import AdminLoginPage from "./AdminLoginPage";
import { useAdminAuth } from "../context/AdminAuthContext";

function Alerts() {
    const { isAdminLoggedIn } = useAdminAuth();
    const [orderAlerts, setOrderAlerts] = useState([]);

    useEffect(() => {
        const fetchOrderAlerts = async () => {
            try {
                // Fetch order alerts from the backend
                const response = await axios.get("/admin/order-alerts");
                setOrderAlerts(response.data);
            } catch (error) {
                console.error("Error fetching order alerts:", error);
            }
        };

        if (isAdminLoggedIn) {
            fetchOrderAlerts();
        }
    }, [isAdminLoggedIn]);

    if (isAdminLoggedIn) {
        return (
            <div className="AlertsContainer">
                <AdminNavbar />
                <AdminBanner name="Alerts" />
                <div className="AlertsContent">
                    <div className="OrderAlerts">
                        <div className="OrderAlertsTitle">
                            <span id="Title">Order Alerts</span>
                            <div className="OrderAlertsList">
                                {orderAlerts.map((order) => (
                                    <OrderAlertsCard
                                        key={order.ProductID}
                                        image={order.image}
                                        productID={order.ProductID}
                                        username={order.Username}
                                        userID={order.UserID}
                                        duration={order.Duration}
                                        price={order.Price}
                                        quantity={order.Quantity}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="Notification">
                        <div className="NotificationTitle">
                            <span id="Title">Inventory Notification</span>
                        </div>
                        <div className="NotificationList">
                            <InventoryNotificationCard />
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
