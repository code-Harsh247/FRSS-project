import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";

function Admin() {
    return (  
        <div className="AdminContainer">
            <AdminNavbar/>
            <AdminBanner name="Admin Dashboard"/>
        </div>
    );
}

export default Admin;