import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import "./Css/Alerts.css";
import OrderAlertsCard from "../components/OrderAlertsCard/OrderAlertsCard";
import InventoryNotificationCard from "../components/InventoryNotificationCard/InventoryNotificationCard";
import AdminLoginPage from "./AdminLoginPage";
import { useAdminAuth } from "../context/AdminAuthContext";

function Alerts() {
    const { isAdminLoggedIn } = useAdminAuth();
    if(isAdminLoggedIn){
    return ( 
        <div className="AlertsContainer">
            <AdminNavbar/>
            <AdminBanner name="Alerts"/>
            <div className="AlertsContent">
            <div className="OrderAlerts">
                <div className="OrderAlertsTitle">
                    <span id="Title">Order Alerts</span>
                    <div className="OrderAlertsList">
                    <OrderAlertsCard/>
                    </div>
                </div>

            </div>
            <div className="Notification">
                <div className="NotificationTitle">
                    <span id="Title">Inventory Notification</span>
                </div>
                <div className="NotificationList">
                    <InventoryNotificationCard/>
                </div>
            </div>
            </div>
        </div>
     );
    }
    else return <AdminLoginPage/>
}

export default Alerts;